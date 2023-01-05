# telagram-chat-ai
This repo is simple implementation of Chat GPT/Open AI to telegram bot in nodejs/expressjs
# instalation
- Clone this repo run ```git clone https://github.com/muhamad-fahmi/telagram-chat-ai.git``` in terminal or cmd
- Run ```npm install``` in terminal or cmd
- Register an account to [OpenAI](https://openai.com/api/) site to get API TOKEN 
- Rename file ```.env.example``` to ```.env```
- Copy a TOKEN API from OpenAI and paste it to environment variable ```OPENAI_API_KEY``` at ```.env``` file
- Open Telegram app and register your new bot to @BotFather 

Example to register new bot :

<img src="https://user-images.githubusercontent.com/60981281/210526830-11993027-b108-4d7a-a50f-722c0405fccc.png" width="600" height="500">

- Copy the BOT TOKEN and paste it to environment variable ```TELEGRAM_BOT_TOKEN``` at ```.env``` file
- Install ngrok [https://ngrok.com/download](https://ngrok.com/download) 
- Configure ngrok and check your local IP in the terminal
- After your ngrok has been configured and local IP checked run ```ngrok http http://your.local.ip:port``` ex: ```ngrok http http://192.168.9.3:3000```
- Copy https ngrok link from your terminal and paste it to environment variable ```APP_URL``` at ```.env``` file
- Run ```npm run dev```
- Open your bot and /start to chat with AI

# Example BOT AI Response
<img src="https://user-images.githubusercontent.com/60981281/210532511-8e945e30-9143-4ede-bd3d-2f9913d524b5.png" width="700" height="600">
