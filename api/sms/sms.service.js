import twilio from 'twilio';
import dotenv from 'dotenv';
import {actualUser} from '../services/auth'
dotenv.config();



export const twilioClient = twilio(process.env.SID, process.env.TOKEN);

export const sendSms = async (phone) => {
  try {
    console.log(phone);
    const message = {
      body: "Pedido recibido!",
      from: process.env.SMS,
      to: "+" + actualUser.phone,
    };
    const response = await twilioClient.messages.create(message);
   response.json(response);
   
  } catch (error) {
    
  }
};

export const sendWhastapp = async (usuario) => {
  try {
    const message = {
      body: `Se ingreso un pedido del usuario ${usuario.username} - ${usuario.name}. `,
      from: process.env.CEL,
      to: "whatsapp:+" + actualUser.phone,
    };
    const response = await twilioClient.messages.create(message);
   response.json(response);
    warnLogger.warn(response);
  } catch (error) {
    console.log(error);
  }
};