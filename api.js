import client from "./clients/apollo";
import { gql } from "@apollo/client";
import { v4 as uuid } from "uuid";
import { create } from "ipfs-http-client";

const API_URL = "https://api.lens.dev";

const httpLink = createHttpLink({
  uri: API_URL,
});

export const challengeQuery = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`;

// returns a challenge
export async function getChallenge(address) {
  const { data: challenge } = await client.query({
    query: challengeQuery,
    variables: {
      address,
    },
  });
  return challenge;
}

export const authenticate = gql`
  mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {
    authenticate(request: { address: $address, signature: $signature }) {
      accessToken
      refreshToken
    }
  }
`;

export async function getJwt(signature, address) {
  const authData = await client.mutate({
    mutation: authenticate,
    variables: {
      address,
      signature,
    },
  });
  return authData;
}

export const feed = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`;

export async function getFeed() {
  const { data: feedData } = await client.query({
    query: feed,
    variables: {
      request: {
        limit: 10,
        sources: ["lenstube-bytes"],
        publicationTypes: ["POST"],
        sortCriteria: "CURATED_PROFILES",
      },
    },
  });
  return feedData;
}

export const postPublication = gql`
  mutation createPostTypedData($request: CreatePublicPostRequest!) {
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          contentURI
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`;

export async function postPublicationMutation(request, token) {
  const result = await client.mutate({
    mutation: postPublication,
    variables: {
      request,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  return result.data.createPostTypedData;
}

const projectId = 1;
const projectSecret = "super";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export async function uploadToIPFS(content, desc, name, meta) {
  const metaData = {
    version: "2.0.0",
    content: content,
    description: desc,
    name: `Post by @${name}`,
    external_url: `https://lenster.xyz/u/${name}`,
    metadata_id: uuid(),
    mainContentFocus: "TEXT_ONLY",
    attributes: [],
    locale: "en-US",
  };

  const result = await client.query({
    query: meta,
    variables: {
      metadatav2: metaData,
    },
  });
  console.log("Metadata verification request: ", result);

  const added = await ipfsClient.add(JSON.stringify(metaData));
  return added;
}
