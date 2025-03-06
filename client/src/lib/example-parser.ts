import { parseSocialUrls } from "@shared/social-url-parser";

// Example URLs
const exampleUrls = [
  'https://www.linkedin.com/posts/joettaylor_built-an-seo-platform-in-7-minutes-using-activity-7300834521128525826-OVb0',
  'https://x.com/IndieJayCodes/status/1896232105711173819'
];

// Parse the URLs
const parsedPosts = parseSocialUrls(exampleUrls);
console.log('Parsed social posts:', parsedPosts);

/*
Expected output:
[
  {
    platform: 'linkedin',
    embedId: '7300834521128525826'
  },
  {
    platform: 'twitter',
    embedId: '1896232105711173819'
  }
]
*/
