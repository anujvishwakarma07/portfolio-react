import React, { useState, useEffect } from 'react'

const HASHNODE_API_URL = 'https://gql.hashnode.com'
const HASHNODE_USERNAME = 'anuj-vishwakarma'

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

function BlogPage() {
  // Fallback dummy articles to display if offline/API CORS failure
  const [posts, setPosts] = useState([
    {
      title: 'Introduction to React and Vite in 2026',
      brief: 'Learn how to build ultra-fast React applications with Vite. We cover project setup, configuration, and structural best practices.',
      publishedAt: '10 June, 2026',
      slug: 'intro-react-vite-2026',
      coverImage: { url: '/assets/img/blog/work01.png' }
    },
    {
      title: 'Mastering Full-Stack MERN Development',
      brief: 'A complete walkthrough of building database-driven applications with Express, React, and MongoDB. Learn database design and RESTful APIs.',
      publishedAt: '08 June, 2026',
      slug: 'mastering-mern-development',
      coverImage: { url: '/assets/img/blog/work2.png' }
    },
    {
      title: 'Understanding CORS and API Security in Frontend Apps',
      brief: 'Solving CORS preflight redirect errors, setting up secure headers, and implementing proxy servers for React development.',
      publishedAt: '05 June, 2026',
      slug: 'understanding-cors-api-security',
      coverImage: { url: '/assets/img/blog/work3.png' }
    }
  ])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Blog | Anuj Vishwakarma – Full Stack Developer'
  }, [])

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
              first: 10
            }
          })
        })

        const result = await response.json()
        const edges = result.data?.user?.publications?.edges?.[0]?.node?.posts?.edges

        if (edges && edges.length > 0) {
          const fetchedPosts = edges.map(edge => {
            const date = new Date(edge.node.publishedAt)
            return {
              title: edge.node.title,
              brief: edge.node.brief,
              publishedAt: date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }),
              slug: edge.node.slug,
              coverImage: { url: edge.node.coverImage?.url || '/assets/img/blog/work01.png' }
            }
          })
          setPosts(fetchedPosts)
        }
      } catch (err) {
        console.warn('Could not fetch from Hashnode API, displaying fallback blogs.', err)
      } finally {
        setLoading(false)
      }
    }
    loadBlogs()
  }, [])

  const featuredPost = posts[0]
  const gridPosts = posts.slice(1)

  return (
    <>
      {/* 1. Header Banner */}
      <section className="breadcrumnd-section" id="bn">
        <div className="container pt-100 pb-100">
          <div className="section-title text-center">
            <span className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              Latest News
            </span>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              Crafting Engaging And
              <span className="text-storkes d-block">Grabbing Blog</span>
            </h2>
          </div>
        </div>
      </section>

      {/* 2. Featured Post Section */}
      {featuredPost && (
        <section className="single-blog pb-100">
          <div className="container text-center">
            <div className="single-blog-wrap cmn-shadow round8">
              <div className="single-thumb">
                <img 
                  src={featuredPost.coverImage.url} 
                  alt={featuredPost.title} 
                  style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div className="single-content text-start">
                <span className="single-date pra-clr fw-400 fz-16">
                  Featured . {featuredPost.publishedAt}
                </span>
                <h3 className="white featured-title mt-2">
                  {featuredPost.title}
                </h3>
                <p className="pra-clr featured-intro mt-3">
                  {featuredPost.brief}
                </p>
                <a 
                  href={`/blog/${featuredPost.slug}`} 
                  className="d-flex align-items-center pra-clr gap-xl-4 gap-3 mt-4"
                >
                  Read the story
                  <span className="arrow">
                    <img src="/assets/img/blog/right-arrow.png" alt="img" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Blog Grid Section */}
      <section className="mblog-section pb-120">
        <div className="container">
          <div className="singletab project-proft-tab">
            <div className="project-head cmn-shadow round8">
              <span className="left-tit">Recent Blog Posts</span>
              <ul className="tablinks">
                <li className="nav-links active">
                  <button className="tablink">All Stories</button>
                </li>
              </ul>
            </div>

            <div className="tabcontents position-relative mt-4">
              <div className="tabitem active">
                <div className="row g-xl-4 g-3">
                  {gridPosts.length > 0 ? (
                    gridPosts.map((post) => (
                      <div key={post.slug} className="col-lg-4 col-md-6">
                        <div className="mblog-item round8 cmn-shadow">
                          <div className="thumb w-100">
                            <img 
                              src={post.coverImage.url} 
                              alt={post.title} 
                              className="round8 w-100" 
                              style={{ height: '250px', objectFit: 'cover' }} 
                            />
                          </div>
                          <div className="content">
                            <span className="mblog-date pra-clr fz-16">
                              Blog . {post.publishedAt}
                            </span>
                            <h4>
                              <a href={`/blog/${post.slug}`} className="white">
                                {post.title}
                              </a>
                            </h4>
                            <a href={`/blog/${post.slug}`} className="cmn-shadow mblog-arrow">
                              <img src="/assets/img/blog/right-arrow.png" alt="img" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="pra-clr text-center w-100">
                      {loading ? 'Synchronizing with Hashnode...' : 'No other stories found.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogPage
