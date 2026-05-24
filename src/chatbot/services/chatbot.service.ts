import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class ChatbotService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  // 👇 SUBSTITUA TUDO DAQUI...
  async chat(
    mensagem: string,
    historico: { role: 'user' | 'assistant'; content: string }[] = [],
  ): Promise<string> {
    const resposta = await this.groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Você é o Mastiga, assistente virtual do Mastiga Delivery. 
          Ajude o cliente a escolher refeições, sugira opções saudáveis, 
          tire dúvidas sobre o cardápio e formas de pagamento. 
          Seja simpático, use emojis com moderação e responda sempre em português.`,
        },
        ...historico,
        {
          role: 'user',
          content: mensagem,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    return (
      resposta.choices[0]?.message?.content || 'Não entendi, pode repetir?'
    );
  }
}
