type SocialPost = {
  platform: 'twitter' | 'linkedin';
  embedId: string;
};

/**
 * Parse a social media URL and extract the platform and embed ID
 * @param url URL from Twitter/X or LinkedIn
 * @returns Object containing platform and embedId
 * @throws Error if URL format is not supported
 */
export function parseSocialUrl(url: string): SocialPost {
  // Clean the URL first
  url = url.trim();
  
  // Twitter/X URL patterns
  const twitterPatterns = [
    /twitter\.com\/\w+\/status\/(\d+)/,
    /x\.com\/\w+\/status\/(\d+)/
  ];
  
  for (const pattern of twitterPatterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        platform: 'twitter',
        embedId: match[1]
      };
    }
  }
  
  // LinkedIn URL pattern
  const linkedinPattern = /linkedin\.com\/.*activity-(\d+)/;
  const linkedinMatch = url.match(linkedinPattern);
  if (linkedinMatch) {
    return {
      platform: 'linkedin',
      embedId: linkedinMatch[1]
    };
  }
  
  throw new Error('Unsupported URL format. Please provide a valid Twitter/X or LinkedIn post URL.');
}

/**
 * Parse multiple social media URLs
 * @param urls Array of social media URLs
 * @returns Array of parsed social posts
 */
export function parseSocialUrls(urls: string[]): SocialPost[] {
  return urls
    .map(url => {
      try {
        return parseSocialUrl(url);
      } catch (error) {
        console.error(`Error parsing URL ${url}:`, error);
        return null;
      }
    })
    .filter((post): post is SocialPost => post !== null);
}

// Example usage:
/*
const urls = [
  'https://www.linkedin.com/posts/joettaylor_built-an-seo-platform-in-7-minutes-using-activity-7300834521128525826-OVb0',
  'https://x.com/IndieJayCodes/status/1896232105711173819'
];

const parsedPosts = parseSocialUrls(urls);
console.log(parsedPosts);
*/
