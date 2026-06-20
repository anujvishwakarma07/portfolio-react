import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const HASHNODE_API_URL = 'https://gql.hashnode.com'
const HASHNODE_HOST = 'blog-anuj.hashnode.dev'

const GET_SINGLE_POST_QUERY = `
  query GetSinglePost($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        title
        publishedAt
        content {
          html
        }
        coverImage {
          url
        }
        author {
          name
          profilePicture
        }
        tags {
          name
        }
      }
    }
  }
`

function BlogDetailsPage() {
  const { slug } = useParams()

  const [post, setPost] = useState({
    title: 'Loading Story...',
    publishedAt: 'Just now',
    coverImage: { url: '/assets/img/blog/blog-details1.png' },
    author: { name: 'Fetching Author...', profilePicture: '/assets/img/blog/jhone.png' },
    content: { html: '<p>Loading article content...</p>' },
    tags: [{ name: 'Development' }]
  })

  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [scrollWidth, setScrollWidth] = useState(0)

  // 1. Fetch Blog Data from Hashnode
  useEffect(() => {
    document.title = `${post.title} | Anuj Vishwakarma`
  }, [post.title])

  useEffect(() => {
    async function fetchPostDetail() {
      try {
        const response = await fetch(HASHNODE_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: GET_SINGLE_POST_QUERY,
            variables: {
              host: HASHNODE_HOST,
              slug: slug
            }
          })
        })

        const result = await response.json()
        const fetchedPost = result.data?.publication?.post

        if (fetchedPost) {
          const date = new Date(fetchedPost.publishedAt)
          setPost({
            title: fetchedPost.title,
            publishedAt: date.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            coverImage: { url: fetchedPost.coverImage?.url || '/assets/img/blog/blog-details1.png' },
            author: {
              name: fetchedPost.author?.name || 'Anuj Vishwakarma',
              profilePicture: fetchedPost.author?.profilePicture || '/assets/img/blog/jhone.png'
            },
            content: { html: fetchedPost.content?.html },
            tags: fetchedPost.tags || [{ name: 'Technology' }]
          })
        } else {
          // Fallback default article details if post not found on Hashnode
          loadFallbackArticle()
        }
      } catch (err) {
        console.warn('API error, loading offline fallback article.', err)
        loadFallbackArticle()
      }
    }

    function loadFallbackArticle() {
      setPost({
        title: slug.replace(/-/g, ' ').toUpperCase(),
        publishedAt: 'June 17, 2026',
        coverImage: { url: '/assets/img/blog/blog-details1.png' },
        author: { name: 'Anuj Vishwakarma', profilePicture: '/assets/img/blog/jhone.png' },
        content: {
          html: `
            <p>Welcome to this article! This content is rendered as a local fallback since your live Hashnode API fetch is either loading or offline.</p>
            <h3>Why build portfolios in React?</h3>
            <p>React gives developers the power to structure components into isolated, reusable blocks. Standard HTML templates require copy-pasting code, whereas React allows you to update one layout file (like the Header or Footer) to immediately sync changes across every route.</p>
            <blockquote>"Writing modular code is not a luxury, it is a foundation for clean scale."</blockquote>
            <p>Additionally, state management inside React makes handling user events (like filtering portfolio items or liking posts) completely smooth without the overhead of heavy jQuery selectors.</p>
          `
        },
        tags: [{ name: 'React' }, { name: 'Vite' }, { name: 'Clean Code' }]
      })
    }

    fetchPostDetail()
  }, [slug])

  // 2. Reading Progress Bar Scroll Event
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollWidth(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 3. LocalStorage Likes Logic
  useEffect(() => {
    const savedLikes = parseInt(localStorage.getItem(`likes_${slug}`)) || 0
    const userLiked = localStorage.getItem(`liked_${slug}`) === 'true'
    setLikes(savedLikes)
    setIsLiked(userLiked)
  }, [slug])

  const handleLike = () => {
    if (!isLiked) {
      const newLikes = likes + 1
      setLikes(newLikes)
      setIsLiked(true)
      localStorage.setItem(`likes_${slug}`, newLikes)
      localStorage.setItem(`liked_${slug}`, 'true')
    }
  }

  return (
    <>
      {/* Top Fixed Reading Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 10001, background: 'transparent' }}>
        <div style={{ height: '100%', width: `${scrollWidth}%`, background: 'white', transition: 'width 0.1s ease-out' }}></div>
      </div>

      {/* 1. Header Banner */}
      <section className="breadcrumnd-section" id="bn">
        <div className="container pt-100 pb-100">
          <div className="section-title breadcurmd-blogdetails">
            <a href="/blog" className="section-sub" data-aos="fade-down" data-aos-duration="1000">
              Blog Details
            </a>
            <h2 className="stitle fw-500 mt-3" data-aos="fade-down" data-aos-duration="1500">
              {post.title}
            </h2>
            <div className="bread-head-info mt-4">
              <div className="d-flex align-items-center gap-3">
                <img src={post.author.profilePicture} alt="author" className="round50" style={{ width: '40px', height: '40px' }} />
                <span className="pra-clr fw-400 fz-16">
                  {post.author.name}
                </span>
              </div>
              <div className="rline"></div>
              <span className="pra-clr fw-400 fz-16">
                {post.publishedAt}
              </span>
              <div className="rline"></div>
              <span className="pra-clr fw-400 fz-16">
                No Comments
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Blog Main Image & Article Content */}
      <section className="blog-details-section pb-100">
        <div className="container">
          <div className="details-blog-wrap">
            <div className="d-thumb w-100">
              <img src={post.coverImage.url} alt="blog cover" className="w-100" style={{ maxHeight: '550px', objectFit: 'cover' }} />
            </div>
            
            {/* HTML Content Injection */}
            <div 
              className="blog-details-content pra-clr fw-400 mb-60 mt-5"
              dangerouslySetInnerHTML={{ __html: post.content.html }}
            />

            {/* Dynamic Like Button */}
            <div className="like-section d-flex align-items-center mb-5">
              <button 
                onClick={handleLike} 
                className={`cmn-shadow d-inline-flex align-items-center gap-2 px-4 py-2 round100`}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--cmborder)',
                  color: isLiked ? '#ff4d4d' : 'white',
                  cursor: isLiked ? 'default' : 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                <span>{likes} Likes</span>
              </button>
            </div>

            {/* Tags & Sharing */}
            <div className="social-tag d-md-flex d-grid gap-3 align-items-center justify-content-md-between justify-content-center">
              <div className="d-flex justify-content-center align-items-center gap-xxl-4 gap-3">
                <span className="fz-20 fw-500 white">Tag:</span>
                <span className="pra-clr">
                  {post.tags.map(tag => tag.name).join(', ')}
                </span>
              </div>
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-xxl-4 gap-3">
                <span className="fz-20 fw-500 white">Share This:</span>
                <ul className="right-social-com d-flex cmn-social gap-xxl-3 gap-2 round8">
                  <li><a href="#0"><i className="bi bi-facebook"></i></a></li>
                  <li><a href="#0"><i className="bi bi-twitter"></i></a></li>
                  <li><a href="#0"><i className="bi bi-linkedin"></i></a></li>
                </ul>
              </div>
            </div>

            {/* Author Bio Box */}
            <div className="toom-bio cmn-shadow round8 mt-5">
              <img src={post.author.profilePicture} alt="author" className="round50" style={{ width: '64px', height: '64px' }} />
              <div className="cont">
                <span className="white fz-20 fw-500 d-block mb-3">
                  About {post.author.name}
                </span>
                <p className="fz-16 pra-clr mb-4">
                  Software developer specializing in full-stack JavaScript applications, algorithms, and technical writing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogDetailsPage
