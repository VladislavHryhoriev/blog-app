import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const client = new GraphQLClient(graphqlAPI);

export const getPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const result = await client.request(query);

	return result.postsConnection.edges;
};

export const GetPostDetails = async (slug) => {
	const query = gql`
		query GetPostDetails($slug: String!) {
			post(where: {slug: $slug}) {
				author {
					bio
					name
					id
					photo {
						url
					}
				}
				createdAt
				slug
				title
				excerpt
				featuredImage {
					url
				}
				categories {
					name
					slug
				}
				content {
					raw
				}
			}
		}
	`;

	const result = await client.request(query, {slug});

	return result.post;
};

export const getRecentPosts = async () => {
	const query = gql`
		query getPostDetails() {
			posts(
				orderBy: createdAt_ASC
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const result = await client.request(query);

	return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
	const query = gql`
		query GetPostDetails($slug: String!, $categories: [String!]) {
			posts(
				where: {slug_not: $slug, AND: { categories_some: { slug_in: $categories }}}
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const result = await client.request(query, {categories, slug});
	
	return result.posts;
};

export const getCategories = async () => {
	const query = gql`
		query getCategories {
			categories {
				name
				slug
			}
		}
	`;

	const result = await client.request(query);
	
	return result.categories;
};


export const submitComment = async (obj) => {
  const result = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.text();
};