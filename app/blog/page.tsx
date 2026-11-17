import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPoster from "@/components/HeroPoster";
import { prisma } from "@/lib/prisma";
import { fallbackBlogPosts } from "@/lib/blog-fallback";

export const metadata: Metadata = {
  title: "Aarovia Group Blog | Real Estate News, Property Investment & Market Insights",
  description: "Stay updated with the latest Bangalore real estate trends, investment opportunities, and expert guidance from AAROVIA.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, allPosts] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true, deletedAt: null },
      orderBy: { publishedAt: "desc" },
    }).catch(() => []),
    prisma.blogPost.findMany({ select: { slug: true } }).catch(() => []),
  ]);
  const databaseSlugs = new Set(allPosts.map((post) => post.slug));
  const visiblePosts = posts.length ? posts : fallbackBlogPosts.filter((post) => !databaseSlugs.has(post.slug));

  return (
    <>
      <Header />








      <div className="hero hero-video">

      <HeroPoster />

      <div className="container">
      <div className="row align-items-center">
      <div className="col-lg-10">

      <div className="hero-content">

      <div className="section-title">
      <h3 className="wow fadeInUp">
                                  Aarovia Group blog
                              </h3>
      <h1 className="text-anime-style-2" data-cursor="-opaque">
                                  Real estate insights, property trends &amp;{" "}
                                  <span>smart investment guides</span>
      </h1>
      <p className="wow fadeInUp" data-wow-delay="0.2s">
                                  Stay updated with the latest Bangalore real estate trends, investment 
                                  opportunities, property buying tips, market insights, villa plot updates, 
                                  farm land investment strategies, and expert guidance from AAROVIA. 
                                  Our blog helps home buyers and investors make confident real estate decisions.
                              </p>
      </div>


      <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
      <a className="btn-default" href="/blog">
                                  explore blogs
                              </a>
      <a className="btn-default btn-highlighted" href="/contact">
                                  talk to experts
                              </a>
      </div>

      </div>

      </div>
      </div>
      </div>
      </div>




      <div className="page-blog">
        <div className="container">
          <div className="row">
            {visiblePosts.map((post, idx) => (
              <div className="col-lg-4 col-md-6" key={post.id}>
                <div className="post-item wow fadeInUp" data-wow-delay={`${(idx % 3) * 0.2}s`}>
                  <div className="post-featured-image">
                    <figure>
                      <a href={`/blog/${post.slug}`} className="image-anime" data-cursor-text="View">
                        <img
                          src={post.coverImage}
                          alt={"coverImageAlt" in post && typeof post.coverImageAlt === "string" && post.coverImageAlt ? post.coverImageAlt : post.title}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    </figure>
                  </div>

                  <div className="post-item-body">
                    <div className="post-item-content">
                      <h3>
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </h3>
                    </div>

                    <div className="post-item-btn">
                      <a href={`/blog/${post.slug}`} className="post-btn">read more</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-lg-12">
              <div className="page-pagination wow fadeInUp" data-wow-delay="1.2s">
                <ul className="pagination">
                  <li><a href="#"><i className="fa-solid fa-angle-left"></i></a></li>
                  <li className="active"><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#"><i className="fa-solid fa-angle-right"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
