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
    // Generate first image - medical/scientific theme
    const image1Prompt = `A professional medical illustration showing ${keyword} in the context of pharmaceutical peptide therapy. Modern, clean medical aesthetic with blue and teal color scheme. High quality, pharmaceutical grade visualization. No text in image.`;
    
    // Generate second image - lifestyle/patient theme  
    const image2Prompt = `A lifestyle image showing health and wellness related to ${keyword}. Professional medical photography style with natural lighting. Show healthy people or medical consultation scenario. Blue and teal medical branding colors. No text in image.`;

    const [image1Response, image2Response] = await Promise.all([
      openai.images.generate({
        model: "dall-e-3",
        prompt: image1Prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      }),
      openai.images.generate({
        model: "dall-e-3", 
        prompt: image2Prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      })
    ]);

    return {
      image1Url: image1Response.data?.[0]?.url || "",
      image2Url: image2Response.data?.[0]?.url || ""
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