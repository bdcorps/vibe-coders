import { posts, type Post, type InsertPost, type Tag } from "@shared/schema";
import { parseSocialUrls } from "@shared/social-url-parser";

export interface IStorage {
  getPosts(): Promise<Post[]>;
  getTags(): Promise<Tag[]>;
}

export class MemStorage implements IStorage {
  private posts: Post[];
  private tags: Tag[];

  constructor() {
    this.tags = [];
    //   [
    //   { id: 'replit', label: 'Replit', category: 'technology' },
    //   { id: 'v0', label: 'V0', category: 'technology' },
    //   { id: 'lovable', label: 'Lovable', category: 'technology' },
    //   { id: 'saas', label: 'SaaS', category: 'industry' },
    //   { id: 'ecommerce', label: 'E-commerce', category: 'industry' },
    //   { id: 'education', label: 'Education', category: 'industry' },
    //   { id: 'cursor', label: 'Cursor', category: 'technology' },
    //   { id: 'chatgpt', label: 'ChatGPT', category: 'technology' }
    // ];

    // Parse the example URLs
    const urls = [
      "https://www.linkedin.com/posts/joettaylor_built-an-seo-platform-in-7-minutes-using-activity-7300834521128525826-OVb0",
      "https://x.com/IndieJayCodes/status/1896232105711173819",
      "https://x.com/im_usamakhalid/status/1895053890888036522",
      "https://www.linkedin.com/posts/jack-brugger-917410167_another-thing-i-love-about-v0-its-so-easy-activity-7302782510084608002-hFll?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/haimantika-mitra_built-this-chill-guy-meme-generator-with-activity-7266333620024303616-PtJk?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/basilchatha_software-development-is-dead-i-just-built-activity-7256713311054901248-KzwG?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/michaelajah_built-with-help-from-cursor-claude-and-v0-activity-7233137974635298817-mq3z?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/julian-englert_its-so-cool-how-vercel-v0-supabase-make-activity-7300959676668493846-FCkL?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/michael-stefanus_productmanagement-ai-mvp-activity-7301826232474578944-BCQJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/tasneem-tarek-b45a22234_day9-alxabraiabrstarterabrkit-nextjs-activity-7298497273812905984-zSzj?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/edwche_one-prompt-a-fully-working-app-i-just-activity-7302610146155728896-CqA5?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/gibeomlee_v0-activity-7280776368269758464-BtbP?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/jamie-fones-76a238173_ai-generated-poker-app-last-weekend-activity-7283444394949545984-x2X0?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/karthikkalyanaraman_with-the-availability-of-open-source-models-activity-7276663232377843712-2nk-?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://www.linkedin.com/posts/daverigotti_test-your-adobe-marketo-knowledge-https-activity-7276253226360795136-rzzw?utm_source=share&utm_medium=member_desktop&rcm=ACoAABe_18EBybMYuaLRqcIH31PwdPAtlduHyys",
      "https://x.com/XRarchitect/status/1894792622138630233",
      "https://x.com/agazdecki/status/1892568577200263655",
      "https://x.com/rajkstats/status/1894184017433694566",
      "https://x.com/Nil_phy_dreamer/status/1894312224908263911",
      "https://x.com/usiriczman/status/1892821593933435085",
      "https://x.com/coderdannn/status/1894721895460979127",
      "https://x.com/s_chiriac/status/1894719026783252965",
      "https://x.com/zehcyriac/status/1894282446352662750",
      "https://x.com/kieshaCreates/status/1890858418925076483",
      "https://x.com/inkko44/status/1890928620559888513",
      "https://x.com/thorwebdev/status/1890413160529629628",
      "https://x.com/HalimAlrasihi/status/1891509348012085402",
      "https://x.com/AtomSilverman/status/1892652734412701920",
      "https://x.com/leerob/status/1892336569039933454",
      "https://x.com/AtomSilverman/status/1895273978190799250"
    ];

    const parsedPosts = parseSocialUrls(urls);

    this.posts = parsedPosts.map((post, index) => ({
      id: index + 1,
      type: post.platform,
      embedId: post.embedId,
      tags: [],
    }));
  }

  async getPosts(): Promise<Post[]> {
    return this.posts;
  }

  async getTags(): Promise<Tag[]> {
    return this.tags;
  }
}

export const storage = new MemStorage();
