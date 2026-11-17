export const BLOG_POST_TYPES = [
  { value: "ARTICLE", label: "Article" },
  { value: "GUIDE", label: "Guide" },
  { value: "NEWS", label: "News" },
  { value: "MARKET_UPDATE", label: "Market update" },
  { value: "PROPERTY_UPDATE", label: "Property update" },
] as const;

export type BlogPostType = (typeof BLOG_POST_TYPES)[number]["value"];

export type BlogSeoInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  postType: string;
  focusKeyword: string;
  seoTitle: string;
  seoDescription: string;
};

export type BlogSeoCheck = {
  id: string;
  label: string;
  passed: boolean;
};

function normalizeText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function includesKeyword(value: string, keyword: string) {
  const normalizedValue = normalizeText(value);
  const normalizedKeyword = normalizeText(keyword);
  return Boolean(normalizedKeyword) && normalizedValue.includes(normalizedKeyword);
}

function wordCount(value: string) {
  return normalizeText(value).split(" ").filter(Boolean).length;
}

export function isBlogPostType(value: string): value is BlogPostType {
  return BLOG_POST_TYPES.some((postType) => postType.value === value);
}

export function getBlogSeoAnalysis(input: BlogSeoInput) {
  const keyword = input.focusKeyword.trim();
  const keywordWords = wordCount(keyword);
  const slugKeyword = normalizeText(keyword).replace(/\s+/g, "-");
  const normalizedContent = normalizeText(input.content);
  const checks: BlogSeoCheck[] = [
    { id: "keyword", label: "Set a focused keyword (1-4 words)", passed: keywordWords >= 1 && keywordWords <= 4 },
    {
      id: "title",
      label: "Use a 30-70 character post title containing the keyword",
      passed: input.title.trim().length >= 30 && input.title.trim().length <= 70 && includesKeyword(input.title, keyword),
    },
    {
      id: "seo-title",
      label: "Use a 30-60 character SEO title containing the keyword",
      passed: input.seoTitle.trim().length >= 30 && input.seoTitle.trim().length <= 60 && includesKeyword(input.seoTitle, keyword),
    },
    {
      id: "description",
      label: "Write a 120-160 character SEO description containing the keyword",
      passed: input.seoDescription.trim().length >= 120 && input.seoDescription.trim().length <= 160 && includesKeyword(input.seoDescription, keyword),
    },
    {
      id: "slug",
      label: "Use a clean URL slug containing the keyword",
      passed: /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) && Boolean(slugKeyword) && input.slug.includes(slugKeyword),
    },
    {
      id: "excerpt",
      label: "Write a 120-200 character excerpt containing the keyword",
      passed: input.excerpt.trim().length >= 120 && input.excerpt.trim().length <= 200 && includesKeyword(input.excerpt, keyword),
    },
    {
      id: "content-keyword",
      label: "Include the keyword in the article content",
      passed: Boolean(keyword) && normalizedContent.includes(normalizeText(keyword)),
    },
    { id: "content-length", label: "Write at least 300 words", passed: wordCount(input.content) >= 300 },
    { id: "headings", label: "Add at least one H2 or H3 subheading", passed: /<h[23]\b/i.test(input.content) },
    {
      id: "internal-link",
      label: "Add an internal link to an Aarovia page",
      passed: /<a\b[^>]*href\s*=\s*["'](?:\/(?!\/)|https?:\/\/(?:www\.)?aaroviagroup\.com(?:\/|["']))/i.test(input.content),
    },
    { id: "image", label: "Add a cover image", passed: Boolean(input.coverImage.trim()) },
    {
      id: "image-alt",
      label: "Write descriptive image alt text (at least 3 words)",
      passed: input.coverImageAlt.trim().length <= 125 && wordCount(input.coverImageAlt) >= 3,
    },
    { id: "post-type", label: "Choose a post type", passed: isBlogPostType(input.postType) },
  ];

  const completed = checks.filter((check) => check.passed).length;
  return {
    score: Math.round((completed / checks.length) * 100),
    checks,
  };
}
