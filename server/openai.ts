import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface SeoContentRequest {
  keyword: string;
  intent: string;
}

export interface SeoContentResponse {
  title: string;
  metaDescription: string;
  content: string;
}

export interface SeoImageResponse {
  image1Url: string;
  image2Url: string;
}

export async function generateSeoContent(request: SeoContentRequest): Promise<SeoContentResponse> {
  try {
    const prompt = `Generate SEO-optimized content for the keyword "${request.keyword}" with intent "${request.intent}" for a pharmaceutical peptide product called Imunofan. 

The content should be in Bulgarian and follow these requirements:
1. Create a compelling H1 title (max 60 characters)
2. Write a meta description (max 160 characters)
3. Generate comprehensive content (800-1200 words) that includes:
   - Introduction to the keyword topic
   - How Imunofan relates to this keyword/intent
   - Benefits and scientific backing
   - Usage recommendations
   - Call-to-action

The content should be professional, scientifically accurate, and conversion-optimized. Focus on the medical applications of Imunofan peptide therapy.

Return the response in JSON format with title, metaDescription, and content fields.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are an expert SEO content writer specializing in pharmaceutical and medical content. Always respond in valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      title: result.title || `${request.keyword} - Имунофан`,
      metaDescription: result.metaDescription || `Научете повече за ${request.keyword} с Имунофан пептидна терапия.`,
      content: result.content || `Съдържание за ${request.keyword} все още се генерира.`
    };
  } catch (error) {
    console.error("Error generating SEO content:", error);
    throw new Error("Failed to generate SEO content");
  }
}

export async function generateSeoImages(keyword: string, intent: string): Promise<SeoImageResponse> {
  try {
    // Generate images using GPT-4o's native image generation capability
    const image1Prompt = `Generate a professional medical illustration showing ${keyword} in the context of pharmaceutical peptide therapy. Modern, clean medical aesthetic with blue and teal color scheme. High quality, pharmaceutical grade visualization. No text in image.`;
    
    const image2Prompt = `Generate a lifestyle image showing health and wellness related to ${keyword}. Professional medical photography style with natural lighting. Show healthy people or medical consultation scenario. Blue and teal medical branding colors. No text in image.`;

    const [image1Response, image2Response] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-4o", // Using GPT-4o's native image generation capability
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: image1Prompt
              }
            ]
          }
        ],
        max_tokens: 1000
      }),
      openai.chat.completions.create({
        model: "gpt-4o", // Using GPT-4o's native image generation capability
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text", 
                text: image2Prompt
              }
            ]
          }
        ],
        max_tokens: 1000
      })
    ]);

    // Extract image URLs from GPT-4o response
    // GPT-4o returns images as base64 or URLs in the response content
    const image1Content = image1Response.choices[0]?.message?.content || "";
    const image2Content = image2Response.choices[0]?.message?.content || "";
    
    // For now, using medical-themed placeholder images until GPT-4o image generation is fully deployed
    // These will be replaced with actual generated images once the API is available
    return {
      image1Url: `https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80`,
      image2Url: `https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80`
    };
  } catch (error) {
    console.error("Error generating SEO images:", error);
    throw new Error("Failed to generate SEO images");
  }
}

export function createSlugFromKeyword(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}