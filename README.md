# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
  "# Dorm_Application"

## How to Install & Run
1. open cmd : git clone https://github.com/Krianapong/Dorm_Application.git
2. cd Dorm_Application
3. pnpm i
4. pnpm run dev

### Admin & User
- Admin
 ado@g.com
 123456


## Web Application
![Alt text](image.png)

## Why is pnpm an option?
pnpm มีเป้าหมายที่ชัดเจน - ประหยัดพื้นที่ดิสก์, เพิ่มความเร็วในการติดตั้ง, และสร้างไดเรกทอรี node_modules ที่ไม่เป็นแบน

ข้อเสนอเหล่านี้โดดเด่นเมื่อเทียบกับตัวจัดการแพ็คเกจอื่น ๆ คนที่มีโปรเจค JavaScript หลายๆ ตัวบนเครื่องของพวกเขาจะรู้สึกว่าพื้นที่ดิสก์เป็นปัญหา; เนื่องจาก NPM และ Yarn ติดตั้ง dependencies เดียวกันสำหรับทุกๆ โปรเจค, ไม่มีการเก็บรวบรวมที่นี่ที่แอปพลิเคชันสามารถนำโค้ดมาใช้ใหม่ได้

ในทางความคิดของฉัน, ข้อได้เปรียบหลักคือเวลาติดตั้ง, ที่เกี่ยวข้องกับไดเรกทอรี node_modules ที่ไม่เป็นแบนและมีการเก็บรวบรวมที่สามารถใช้ dependencies ที่ดาวน์โหลดไว้แล้ว อัลกอริทึมสำหรับการสร้างต้นไม้แบนมีความเรียบง่ายมากกว่าที่ NPM และ Yarn ใช้, และวิธีที่ lock files ถูกสร้างทำให้กระบวนการดำเนินงานได้เร็วขึ้น

เหตุผลอื่น ๆ คือการมีที่เก็บกลางที่มีทุก package ที่ดาวน์โหลดและ dependencies ที่ได้รับการประมวลผลไว้แล้ว, ทำให้ง่ายต่อการมอบหมายให้กับโปรเจคที่ pnpm กำลังติดตั้ง dependencies นี้

## Performance comparison
![Alt text](image-1.png)