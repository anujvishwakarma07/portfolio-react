import React, { useState, useEffect } from 'react'

const HASHNODE_API_URL = 'https://gql.hashnode.com'
const HASHNODE_USERNAME = 'anuj-vishwakarma'

// Hashnode GraphQL Query to get 3 posts
const GET_POSTS_QUERY = `
  query GetPosts($username: String!, $first: Int!) {
    user(username: $username) {
      publications(first: 1) {
        edges {
          node {
            posts(first: $first) {
              edges {
                node {
                  title
                  brief
                  publishedAt
                  slug
                  coverImage {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

function Blogs() {
  // Initial state uses static design placeholder articles as fallback
  const [posts, setPosts] = useState([
    {
      title: 'Creative strategy and execution',
      publishedAt: '25 March, 2024',
      slug: 'creative-strategy-and-execution',
      coverImage: { url: '/assets/img/blog/blog-chain1.png' },
      tag: 'UI Design'
    },
    {
      title: 'The art of typography in web design.',
      publishedAt: '25 March, 2024',
      slug: 'the-art-of-typography',
      coverImage: { url: '/assets/img/blog/blog-client2.png' },
      tag: 'UI Design'
    },
    {
      title: 'The impact of color psychology in design.',
      publishedAt: '25 March, 2024',
      slug: 'the-impact-of-color',
      coverImage: { url: '/assets/img/blog/blog-client3.png' },
      tag: 'UI Design'
    }
  ])

  useEffect(() => {
    async function loadBlogs() {
      try {
        const response = await fetch(HASHNODE_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: GET_POSTS_QUERY,
            variables: {
              username: HASHNODE_USERNAME,
              first: 3
            }
          })
        })

        const result = await response.json()
        const edges = result.data?.user?.publications?.edges?.[0]?.node?.posts?.edges

        if (edges && edges.length > 0) {
          const fetchedPosts = edges.map(edge => {
            const date = new Date(edge.node.publishedAt)
            const formattedDate = date.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })

            return {
              title: edge.node.title,
              publishedAt: formattedDate,
              slug: edge.node.slug,
              coverImage: { url: edge.node.coverImage?.url || '/assets/img/blog/blog-chain1.png' },
              tag: 'Insight'
            }
          })
          setPosts(fetchedPosts)
        }
      } catch (err) {
        console.warn('Could not fetch from Hashnode API, displaying fallback blogs.', err)
      }
    }

    loadBlogs()
  }, [])

  return (
    <section className="blog-section check-box-style mb-common pt-100 pb-100" id="blogs">
      <div className="container">
        <div className="cus__mb60 d-md-flex d-grid align-items-center justify-content-between gap-3">
          <div className="section-title">
            <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              Latest News
            </span>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              Crafting Engaging &
              <span className="text-storkes d-block">
                Grabbing Blog
              </span>
            </h2>
          </div>
          <div className="blog-hoverbox">
            <a href="blog.html" className="hover-circle cmborder wow fadeInUp" data-wow-duration="1.6s">
              <span className="box">
                <i className="bi bi-arrow-up-right"></i>
                <span className="textmore">See All Blogs</span>
              </span>
            </a>
          </div>
        </div>

        <div className="row g-4 justify-content-between">
          <div className="col-xl-4 col-lg-3">
            <p className="blog-single-pragraph">
              Get the latest insights and our thoughts on everything digital.
            </p>
          </div>
          <div className="col-xl-8 col-lg-9">
            <div className="service__uniquewrap">
              {posts.map((post, idx) => (
                <div 
                  key={post.slug || idx} 
                  className="service__unique__item pb-30 pt-30" 
                  data-aos="fade-up" 
                  data-aos-duration="1000"
                >
                  <div className="left__service">
                    <div className="serial__adjust">
                      <div className="cont">
                        <div className="date-inner d-flex align-items-center gap-2">
                          <span className="fw-500 pra-clr">{post.tag}</span>
                          <span className="pra-dot"></span>
                          <span className="fw-500 pra-clr">{post.publishedAt}</span>
                        </div>
                        <h3>
                          <a href={`blog-details.html?slug=${post.slug}`}>
                            {post.title}
                          </a>
                        </h3>
                        <a href={`blog-details.html?slug=${post.slug}`} className="read-arrow d-flex align-items-center">
                          Read the story
                          <img src="/assets/img/blog/right-arrow.png" alt="img" />
                        </a>
                      </div>
                    </div>
                    <a href={`blog-details.html?slug=${post.slug}`} className="opa__thumb">
                      <img src={post.coverImage.url} alt="blog cover image" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blogs
