import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from '../services/chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('mensagem')
  async enviarMensagem(
    @Body()
    body: {
      mensagem: string;
      historico?: { role: 'user' | 'assistant'; content: string }[];
    },
  ) {
    const resposta = await this.chatbotService.chat(
      body.mensagem,
      body.historico || [],
    );
    return { resposta };
  }
}
