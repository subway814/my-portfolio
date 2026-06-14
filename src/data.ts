import { PortfolioItem, SubPageKey } from './types';

const shuffle = <T,>(arr: T[]): T[] => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export interface StageData {
  title: string;
  subtitle: string;
  num: string;
  desc: string;
  categories?: Record<string, PortfolioItem[]>;
  items?: PortfolioItem[];
}

export const STAGES: Record<SubPageKey, StageData> = {
  "video": {
    "num": "01",
    "title": "视频作品",
    "subtitle": "VIDEO",
    "desc": "原创纪录片、影像实验与新媒体短视频分类展示",
    "categories": {
      "个人作品": [
        {
          "title": "2023年度视频",
          "desc": "个人创意视频作品",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV1tt4y1f7jQ/?spm_id_from=333.1387.search.video_card.click&vd_source=ea3f3c4357a2c2766388976f647a",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVdIRqLXlIRO8-BnruBVqMFvsTwHYAAXsAAj0nAAJJK2hV1S2wJmF-eRo8BA.jpg",
          "fullDesc": "这部作品总结了2023年全年的创意视频制作成果，融合影像叙事、视觉特效与音乐编排，展现个人对视频语言的深度理解与创意表达能力。"
        },
        {
          "title": "2024年度视频",
          "desc": "个人创意视频作品",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV1M3fjY2Eh4?spm_id_from=333.788.recommend_more_video.-1&trackid=web_related_0.router-related-2589621-tj4lz.1780581269903.905&vd_source=ea3f3c4357a2c2766388976f647a",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVdIhqLXmDtASjs7K5GfBK_iFRctNXHwACQScAAkkraFUjuBjuznINujwE.jpg",
          "fullDesc": "2024年度作品集中突破内容结构创新与视觉品牌化，通过系统化的色彩策略、信息设计与时间节奏编排，打造更具传播力的视频内容。"
        },
        {
          "title": "2025年度视频",
          "desc": "个人创意视频作品",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV17pZAB7EQA?spm_id_from=333.788.recommend_more_video.-1&trackid=web_related_0.router-related-2589621-jb4mv.1780581474322.508&vd_source=ea3f3c4357a2c2766388976f647a",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVdI9qLXnJzpYyJbmAK254_B-zjRY50QACSCcAAkkraFXNWoinCe51ATwE.jpg",
          "fullDesc": "2025年度视频作品探索新媒体生态下的内容创新路径，融入AI辅助创意工具、沉浸式叙事手法与多平台适配策略，代表个人最新的创作思维。"
        },
        {
          "title": "最好的时光",
          "desc": "高中校园混剪视频",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV1zfureGEdW/?spm_id_from=333.1387.upload.video_card.click&vd_source=ea3f3c4357a2c2766388976f647a",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVdJJqLXoGddMREArxHoiy_acc5xzvpQACSycAAkkraFXnhZ3pHKPhdDwE.jpg",
          "fullDesc": "以校园青春生活为主题的混剪作品，通过精选的校园片段、学生互动和青春气息的音乐编排，呈现高中时期最珍贵的校园时光和青春回忆，在快速转换的镜头中捕捉青年学生的朝气与活力。"
        },
        {
          "title": "梦",
          "desc": "意识流视频作品",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV1gPYbezE7h/?spm_id_from=333.1387.upload.video_card.click",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVdKBqLXu560X52u2m5MjJd9ImuMxLaQACWycAAkkraFVEnd6evdQWrjwE.jpg",
          "fullDesc": "一部探索梦境与现实边界的意识流创意视频，采用非线性叙事、虚实转换与视觉变形手法，通过抽象的画面、诗意的镜头语言和沉浸式的音效设计，引领观众踏入一个迷幻而深邃的梦幻世界。"
        },
        {
          "title": "湖北大学随机采访",
          "desc": "校园采访视频作品",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV17e411o7ET/?spm_id_from=333.1387.upload.video_card.click&vd_source=ea3f3c4357a2c276638897669b7f647a",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfolqLuZNgKHE641FE6t8pA-JB6KSTAACcC0AAhZseFV6JcrBmaxbkTwE.jpg",
          "fullDesc": "以湖北大学真实校园为背景的随机采访作品。通过随机采访在校学生，深入了解学生对校园生活、学习与成长的真实感受和想法，以鲜活的镜头语言和真诚的对话呈现校园里最真实的青春故事。"
        }
      ],
      "课程作品": [
        {
          "title": "玫瑰少年",
          "desc": "校园MV翻拍视频",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV19CEA6LELZ/?spm_id_from=333.1387.homepage.video_card.click",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVdKJqLXv03rvrHUsfRcqNhU4rP6nRfgACXScAAkkraFU_5brXhZ4fXTwE.jpg",
          "fullDesc": "对经典音乐MV的创意翻拍版本，以校园为背景，融入学生真实的青春场景和互动，通过镜头运动、色彩搭配和节奏编辑，创作出既保留原意又具有鲜明校园特色的青春视听作品。"
        },
        {
          "title": "星际穿越 预告片",
          "desc": "广播电视课程预告片剪辑",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV1wqJP6AEGh/?vd_source=ea3f3c4357a2c276638897669b7f647a",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVdKVqLXwadNF7UaFbywYtUEq04zSutAACYScAAkkraFWloRxFnBWicTwE.png",
          "fullDesc": "以科幻大片《星际穿越》为素材的课程预告片剪辑作品，通过精准的镜头选取、音乐节奏把控 and 视觉特效呈现，展现大片的恢宏气势 and 深邃内涵，体现专业的剪辑手法 and 审美品味。"
        },
        {
          "title": "《望庐山瀑布》中的借景抒情",
          "desc": "计算机设计大赛微课视频",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV1HqJP6AErk/?vd_source=ea3f3c4357a2c276638897669b7f647a",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVdKdqLXw9zF5KoZP4p3nR0-LO5PmUFwACYycAAkkraFUjMxjmgWqX7DwE.png",
          "fullDesc": "一部融合文学课程与视觉创作的微课视频，通过景观摄影、古诗解读与现代设计手法，深入解析李白《望庐山瀑布》中借景抒情的艺术手法，将经典文学与视觉美学完美结合，展现创新的教学视角。"
        },
        {
          "title": "超能SupNice 影视广告",
          "desc": "大广赛超能命题广告视频",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV1HqJP6AE4x/?vd_source=ea3f3c4357a2c276638897669b7f647a",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVdKlqLXxcJvO4bJHaZyHlfiJm4_2vJgACZScAAkkraFX1zy-pC2pYEjwE.png",
          "fullDesc": "参赛大广赛超能SupNice命题的创意广告视频作品，融合品牌内涵、创意概念与视觉表现，通过故事化叙事、情感共鸣与视觉冲击，打造出既符合品牌调性又具有创新意识的商业广告作品。"
        },
        {
          "title": "探寻武汉历史文化",
          "desc": "思政作业",
          "type": "video",
          "src": "https://www.bilibili.com/video/BV13u4y1w7pV/?spm_id_from=333.1387.upload.video_card.click&vd_source=ea3f3c4357a2c276638897669b7f647a",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfotqLua_tA4zFjPglARr1aFRYShiBAACci0AAhZseFUU4lz5_8g-0TwE.jpg",
          "fullDesc": "以武汉城市历史文化遗产为探索主题的思政实践作业。通过实地走访武汉历史地标、采访当地居民与文化工作者，深度呈现武汉的历史底蕴与当代文化活力，展现新时代青年对文化传承与创新的理解与思考。"
        }
      ],
      "校园作品": [
        {
          "title": "小满",
          "desc": "校园短视频作品",
          "type": "video",
          "src": "https://open.douyin.com/player/video?vid=7506887930049613110&autoplay=0",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfjRqLtmQZJ9AUrK6anFEO8uctfQAATMAAhMtAAIWbHhVqUizMojhbPY8BA.png",
          "fullDesc": "小满时节，校园里的青春故事。以细腻的情感捕捉校园生活的美好瞬间。",
          "tags": ["剪辑", "配乐"]
        },
        {
          "title": "微波炉转场",
          "desc": "校园短视频作品",
          "type": "video",
          "src": "https://open.douyin.com/player/video?vid=7488955990616919331&autoplay=0",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfjhqLtneoeSQ5HOXdCLCVQ0LDymp3QACFy0AAhZseFVlw3zVO8PLojwE.png",
          "fullDesc": "创意转场短片，用日常场景与视觉语言玩转创意节奏。",
          "tags": ["选题", "AI生成", "剪辑"]
        },
        {
          "title": "湖北大学演绎之星活动",
          "desc": "校园活动记录",
          "type": "video",
          "src": "https://open.douyin.com/player/video?vid=7443046877534227775&autoplay=0",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfj1qLtrU4SHrToreT0oYpUbi3LEwFgACHy0AAhZseFUaOALdQO2qRDwE.png",
          "fullDesc": "湖北大学演绎之星校园活动现场纪实，以镜头语言呈现活动亮点与学生风貌。",
          "tags": ["拍摄", "剪辑"]
        },
        {
          "title": "学校变成气球飞走了",
          "desc": "创意特效短片",
          "type": "video",
          "src": "https://open.douyin.com/player/video?vid=7429573679857683748&autoplay=0",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfj5qLttjwBr80VWdfO_4E_k_dG4UkwACIS0AAhZseFVlGOQTmB7OiDwE.png",
          "fullDesc": "创意特效短片，用想象力让校园化身气球飞向远方。",
          "tags": ["选题", "AI生成"]
        },
        {
          "title": "湖大时间切片",
          "desc": "时间切片创意短片",
          "type": "video",
          "src": "https://open.douyin.com/player/video?vid=7420035229718531354&autoplay=0",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfkFqLtvYp8AweakrthYW1OlngROddwACJC0AAhZseFXug4wp200d4jwE.png",
          "fullDesc": "用时间切片的拍摄手法，展现湖大一日的光影变化与校园律动。",
          "tags": ["选题", "拍摄", "剪辑"]
        },
        {
          "title": "第一视角打开新生开学",
          "desc": "新生开学纪实",
          "type": "video",
          "src": "https://open.douyin.com/player/video?vid=7411788797173714213&autoplay=0",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfkZqLtxWFolNZrSTXo5tGe7hrm6YwgACKS0AAhZseFWBQVK8g6xOrzwE.png",
          "fullDesc": "第一人称视角沉浸式记录新生开学报道的一天，真实代入感与情绪流动。",
          "tags": ["拍摄"]
        },
        {
          "title": "湖大开学清单",
          "desc": "开学指南短视频",
          "type": "video",
          "src": "https://open.douyin.com/player/video?vid=7407038619199769893&autoplay=0",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfkdqLty7bIUDR462ZIDyiPF6GelgZQACKi0AAhZseFWTxVRVjeO2FTwE.png",
          "fullDesc": "湖大新生入学清单指南，实用信息与视觉节奏并重，帮助新同学快速融入。",
          "tags": ["选题", "剪辑"]
        },
        {
          "title": "高考加油，我在湖大等你",
          "desc": "高考励志短片",
          "type": "video",
          "src": "https://open.douyin.com/player/video?vid=7376895198477045007&autoplay=0",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfktqLt0pDhOgLl4mApQPAq6iwaZk9QACLi0AAhZseFW9EannCypQejwE.png",
          "fullDesc": "为高考学子加油打气的励志短片，带观众提前感受湖大校园氛围与学子期待。",
          "tags": ["选题", "拍摄", "剪辑"]
        },
        {
          "title": "用plog转vlog的方式打开湖大的春天",
          "desc": "春天校园创意短片",
          "type": "video",
          "src": "https://open.douyin.com/player/video?vid=7355461634401389834&autoplay=0",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVfk5qLt2mYKL03CuzJeKxnrAg1etpvgACMi0AAhZseFViWc9NhZ3UvjwE.png",
          "fullDesc": "用plog与vlog交融的节奏，记录湖大春天的花海、微风与校园气息。",
          "tags": ["选题", "拍摄", "剪辑"]
        },
        {
          "title": "“框”住湖大，I ❤ HUBU",
          "desc": "校园创意视觉短片",
          "type": "video",
          "src": "https://open.douyin.com/player/video?vid=7354349915746716982&autoplay=0",
          "img": "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEVflNqLt45Kb39XMssiY_yoYSRTnXnSgACOC0AAhZseFVeAAGkuoWl6Vk8BA.png",
          "fullDesc": "用构图与框景视觉语言，把湖大校园的角落与情感一一收集呈现。",
          "tags": ["选题", "拍摄", "剪辑"]
        }
      ]
    }
  },
  "design": {
    "num": "02",
    "title": "平面作品",
    "subtitle": "GRAPHIC",
    "desc": "高分策划案、跨界营销全案与纸张网格装帧美学分类展示",
    "categories": {
      "课业成果": [
        {
          "title": "青漾湖北文旅策划 - 定制游策划案",
          "desc": "广告调查课程实践项目",
          "type": "album",
          "src": "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案",
          "img": "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案.png",
          "fullDesc": "包含定制游策划与市场调研，针对毕业生群体定制的文旅探索方案。包含完整的行程设计、地标打卡和预算分析，是获得高分的实战营销全案。",
          "slides": [
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片1.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片2.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片3.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片4.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片5.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片6.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片7.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片8.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片9.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片10.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片11.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片12.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片13.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片14.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片15.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片16.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片17.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片18.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片19.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片20.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片21.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片22.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片23.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片24.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片25.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片26.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片27.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片28.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片29.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片30.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片31.PNG",
            "docs/青漾湖北“比耶在武汉”毕业生武汉定制游策划案/幻灯片32.PNG"
          ]
        },
        {
          "title": "青漾湖北文旅策划 - 消费意愿与数据分析",
          "desc": "广告调查课程实践项目",
          "type": "album",
          "src": "docs/毕业生文旅消费意愿访谈与数据分析汇总",
          "img": "docs/毕业生文旅消费意愿访谈与数据分析汇总.png",
          "fullDesc": "访谈与数据汇总分析报告。基于多位毕业生深度定性访谈和科学问卷设计，归纳核心消费偏好、预算区间与旅行痛点。",
          "slides": [
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片1.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片2.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片3.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片4.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片5.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片6.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片7.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片8.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片9.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片10.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片11.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片12.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片13.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片14.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片15.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片16.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片17.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片18.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片19.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片20.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片21.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片22.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片23.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片24.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片25.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片26.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片27.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片28.PNG",
            "docs/毕业生文旅消费意愿访谈与数据分析汇总/幻灯片29.PNG"
          ]
        },
        {
          "title": "《怪物》音乐剧营销策划",
          "desc": "广告创意与策划课程实践项目",
          "type": "album",
          "src": "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案",
          "img": "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案.png",
          "fullDesc": "千人千怪，绘出你心底的怪物——《怪物》音乐剧整合营销与传播方案。针对当代年轻人口碑发酵设计裂变机制，并结合线下创意物料进行全面破圈。",
          "slides": [
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片1.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片2.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片3.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片4.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片5.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片6.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片7.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片8.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片9.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片10.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片11.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片12.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片13.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片14.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片15.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片16.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片17.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片18.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片19.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片20.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片21.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片22.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片23.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片24.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片25.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片26.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片27.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片28.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片29.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片30.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片31.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片32.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片33.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片34.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片35.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片36.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片37.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片38.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片39.PNG",
            "docs/千人千怪，绘出你心底的怪物-怪物音乐剧策划案/幻灯片40.PNG"
          ]
        },
        {
          "title": "欧莱雅品牌公关策划 - 自然美回归",
          "desc": "公共关系课程作业",
          "type": "album",
          "src": "docs/让美回归自然，让自然重塑美",
          "img": "docs/让美回归自然，让自然重塑美.png",
          "fullDesc": "让美回归自然，让自然重塑美——以公共关系活动为核心的深度品牌传播方案。针对绿色消费理念，重建品牌在绿色可持续领域的领导地位。",
          "slides": [
            "docs/让美回归自然，让自然重塑美/幻灯片1.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片2.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片3.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片4.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片5.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片6.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片7.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片8.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片9.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片10.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片11.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片12.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片13.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片14.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片15.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片16.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片17.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片18.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片19.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片20.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片21.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片22.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片23.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片24.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片25.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片26.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片27.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片28.PNG",
            "docs/让美回归自然，让自然重塑美/幻灯片29.PNG"
          ]
        },
        {
          "title": "欧莱雅品牌认知调查报告（Z世代）",
          "desc": "公共关系作业（PDF）",
          "type": "pdf",
          "src": "docs/Z世代对欧莱雅品牌的认知调查报告-公共关系作业.pdf",
          "img": "docs/Z世代对欧莱雅品牌的认知调查报告-公共关系作业.png",
          "fullDesc": "基于定量问卷调查、因子分析等专业 research 方法，针对Z世代青年群体对欧莱雅集团旗下矩阵品牌的认知广度、美誉度与购买动力进行的多维透视分析（PDF）。"
        },
        {
          "title": "媒介融合下的广播电视创新",
          "desc": "湖南卫视新媒体思维的应用与实践",
          "type": "album",
          "src": "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践",
          "img": "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践.png",
          "fullDesc": "深度剖析湖南卫视在融媒体时代的芒果超媒化生态转型，研究主流媒体实现年轻态表达与垂直社群运营的核心策略。",
          "slides": [
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片1.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片2.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片3.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片4.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片5.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片6.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片7.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片8.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片9.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片10.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片11.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片12.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片13.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片14.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片15.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片16.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片17.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片18.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片19.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片20.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片21.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片22.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片23.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片24.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片25.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片26.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片27.PNG",
            "docs/媒介融合下的广播电视创新——湖南卫视新媒体思维的应用与实践/幻灯片28.PNG"
          ]
        },
        {
          "title": "长津湖影视分析",
          "desc": "广播电视课程作业",
          "type": "album",
          "src": "docs/长津湖影视分析",
          "img": "docs/长津湖影视分析.png",
          "fullDesc": "针对新主流电影《长津湖》开展的学术性拉片与影视分析。涵盖影片宏大叙事与微观情感的结合，视听语言（音效、剪辑）和民族精神的多重考量。",
          "slides": [
            "docs/长津湖影视分析/幻灯片1.PNG",
            "docs/长津湖影视分析/幻灯片2.PNG",
            "docs/长津湖影视分析/幻灯片3.PNG",
            "docs/长津湖影视分析/幻灯片4.PNG",
            "docs/长津湖影视分析/幻灯片5.PNG",
            "docs/长津湖影视分析/幻灯片6.PNG",
            "docs/长津湖影视分析/幻灯片7.PNG",
            "docs/长津湖影视分析/幻灯片8.PNG",
            "docs/长津湖影视分析/幻灯片9.PNG",
            "docs/长津湖影视分析/幻灯片10.PNG",
            "docs/长津湖影视分析/幻灯片11.PNG",
            "docs/长津湖影视分析/幻灯片12.PNG",
            "docs/长津湖影视分析/幻灯片13.PNG",
            "docs/长津湖影视分析/幻灯片14.PNG",
            "docs/长津湖影视分析/幻灯片15.PNG"
          ]
        },
        {
          "title": "云南白药品牌故事与营销策略",
          "desc": "世界广告通史课程作业",
          "type": "album",
          "src": "docs/云南白药品牌故事与营销策略",
          "img": "docs/云南白药品牌故事与营销策略.png",
          "fullDesc": "品牌溯源与当代营销策略分析。探讨百年老字号云南白药如何通过品牌重构、产品线延伸以及差异化跨界营销注入年轻生命力。",
          "slides": [
            "docs/云南白药品牌故事与营销策略/幻灯片1.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片2.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片3.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片4.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片5.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片6.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片7.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片8.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片9.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片10.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片11.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片12.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片13.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片14.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片15.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片16.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片17.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片18.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片19.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片20.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片21.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片22.PNG",
            "docs/云南白药品牌故事与营销策略/幻灯片23.PNG"
          ]
        },
        {
          "title": "武汉三大商业体消费者行为对比分析",
          "desc": "消费者行为学课程作业",
          "type": "album",
          "src": "docs/武汉三大商业体消费者行为对比分析 -消费者作业",
          "img": "docs/武汉三大商业体消费者行为对比分析 -消费者作业.png",
          "fullDesc": "对武汉核心商业圈的三大主要购物地（高档重奢社群、时尚潮流聚集、家庭体验中心）展开的消费者心理和实地动线观测对比分析。",
          "slides": [
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片1.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片2.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片3.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片4.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片5.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片6.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片7.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片8.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片9.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片10.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片11.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片12.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片13.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片14.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片15.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片16.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片17.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片18.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片19.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片20.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片21.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片22.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片23.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片24.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片25.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片26.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片27.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片28.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片29.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片30.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片31.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片32.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片33.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片34.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片35.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片36.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片37.PNG",
            "docs/武汉三大商业体消费者行为对比分析 -消费者作业/幻灯片38.PNG"
          ]
        },
        {
          "title": "春节申遗成功",
          "desc": "跨文化传播课程作业",
          "type": "album",
          "src": "docs/春节申遗成功-跨文化传播",
          "img": "docs/春节申遗成功-跨文化传播.png",
          "fullDesc": "春节申遗成功语境下的国家形象建构与跨文化传播策略。分析民俗活动作为世界文化语言在异域文化体中的落地与价值共鸣。",
          "slides": [
            "docs/春节申遗成功-跨文化传播/幻灯片1.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片2.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片3.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片4.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片5.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片6.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片7.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片8.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片9.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片10.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片11.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片12.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片13.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片14.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片15.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片16.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片17.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片18.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片19.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片20.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片21.PNG",
            "docs/春节申遗成功-跨文化传播/幻灯片22.PNG"
          ]
        }
      ],
      "平面设计": [
        {
          "title": "专辑装帧设计",
          "desc": "专辑装帧设计项目，带精致顺序交互预览图集",
          "type": "album",
          "src": "album",
          "img": "docs/专辑/p0.png",
          "fullDesc": "本专辑装帧设计方案探寻网格在二维与三维承载介质上的几何拆解。重组经典的包豪斯构图，并将实体唱片的设计细节一一展现。支持在弹窗内通过高级滑块或手风琴方式，连续高清翻阅全套16页装帧方案。",
          "slides": [
            "docs/专辑/p0.png",
            "docs/专辑/p1.png",
            "docs/专辑/p2.png",
            "docs/专辑/p3.png",
            "docs/专辑/p3(2).png",
            "docs/专辑/p4.png",
            "docs/专辑/p4(2).png",
            "docs/专辑/p5.png",
            "docs/专辑/p5（2）.png",
            "docs/专辑/p6.png",
            "docs/专辑/p6(2).jpg",
            "docs/专辑/p7（1）.png",
            "docs/专辑/p7（2）.png",
            "docs/专辑/p8（1）.png",
            "docs/专辑/p8（2）.png",
            "docs/专辑/p16.png"
          ]
        },
        {
          "title": "单曲封面设计",
          "desc": "平面设计作品",
          "type": "album",
          "src": "docs/单曲",
          "img": "docs/单曲/cover.jpeg",
          "fullDesc": "个人原创单曲封面设计作品集，为多首音乐单曲量身设计的视觉封面。从色彩情绪、图形语言到版式构图，每一张封面都回应歌曲的气质与故事，打造具有独立识别度的音乐视觉包装体系。",
          "slides": [
            "docs/单曲/01.png",
            "docs/单曲/02.jpeg",
            "docs/单曲/03.jpeg",
            "docs/单曲/04.jpeg",
            "docs/单曲/05.jpeg",
            "docs/单曲/06.jpeg",
            "docs/单曲/07.jpeg",
            "docs/单曲/08.jpeg",
            "docs/单曲/09.jpeg",
            "docs/单曲/10.jpg",
            "docs/单曲/11.png"
          ]
        }
      ]
    }
  },
  "photo": {
    "num": "03",
    "title": "摄影作品",
    "subtitle": "PHOTOGRAPHY",
    "desc": "人像、静物、风景与现场摄影作品集",
    "categories": {
      "人像": [
        {
          "title": "人像摄影",
          "desc": "人物肖像与光影艺术",
          "type": "album",
          "src": "images/人像",
          "img": "images/人像/IMG_20250301_210922.jpg",
          "fullDesc": "人像摄影作品集，记录人物神态与光影的完美结合，展现多样的人物风貌与情感表达。",
          "slides": shuffle([
            "images/人像/000055.jpg",
            "images/人像/mmexport1777991775006.jpg",
            "images/人像/IMG_20260530_010609.jpg",
            "images/人像/retouch_2026032121422441.jpg",
            "images/人像/retouch_2025113023500921.jpg",
            "images/人像/retouch_2025113023452128.jpg",
            "images/人像/mmexport1777544915171.jpg",
            "images/人像/mmexport1777116415432.jpg",
            "images/人像/mmexport1775487949085.jpg",
            "images/人像/mmexport1775479724057.jpg",
            "images/人像/mmexport1775383534170.jpg",
            "images/人像/mmexport1764517003147.jpg",
            "images/人像/KAPI_富士-CC_260404043205418.jpg",
            "images/人像/KAPI_XT30_260321100523424.jpg",
            "images/人像/IMG_20251031_215034.jpg",
            "images/人像/IMG_20251006_034411.jpg",
            "images/人像/1773316991735.jpeg",
            "images/人像/retouch_2025100521483495.png",
            "images/人像/retouch_2025100517382427.jpg",
            "images/人像/retouch_2025100502543467.jpg",
            "images/人像/retouch_2025082502464344.jpg",
            "images/人像/retouch_2025082500202387.jpg",
            "images/人像/retouch_2025082422595719.jpg",
            "images/人像/retouch_2025072601020728.jpg",
            "images/人像/retouch_2025072600562222.jpg",
            "images/人像/retouch_2025072600534130.jpg",
            "images/人像/mmexport1753509236901.jpg",
            "images/人像/mmexport1753509148710.jpg",
            "images/人像/KAPI_XT30_250818011123887.jpg",
            "images/人像/KAPI_FUJI-X_250817054429113.jpg",
            "images/人像/IMG_20250601_165742.jpg",
            "images/人像/retouch_2025040621182477.png",
            "images/人像/retouch_2024121216380482.jpg",
            "images/人像/retouch_2024100522450825.jpg",
            "images/人像/retouch_2024100402513310.jpg",
            "images/人像/retouch_2024091602591455.jpg",
            "images/人像/mmexport1734795537627.jpg",
            "images/人像/IMG_20250604_020259.jpg",
            "images/人像/IMG_20250601_121622.jpg",
            "images/人像/IMG_20250301_234016.jpg",
            "images/人像/IMG_20250301_230233.jpg",
            "images/人像/IMG_20250301_210922.jpg",
            "images/人像/IMG_20241212_162810.jpg",
            "images/人像/IMG_20241212_162244.jpg",
            "images/人像/20250322154530_IMG_2859.JPG",
            "images/人像/昙华林.png",
            "images/人像/retouch_2024081221111093.jpg",
            "images/人像/retouch_2024061301392996.png",
            "images/人像/retouch_2024061002143239.jpg",
            "images/人像/mmexport1726426062536.png",
            "images/人像/mmexport1718024420084.jpg",
            "images/人像/mmexport1718024416613.jpg",
            "images/人像/IMG_20240810_002057.jpg",
            "images/人像/IMG_20240610_005829.png",
            "images/人像/20240609134140_IMG_2682.JPG",
            "images/人像/retouch_2024060120172565.jpg",
            "images/人像/mmexport1717261838469.jpg",
            "images/人像/mmexport1716718142341.jpg",
            "images/人像/mmexport1716718121022.jpg",
            "images/人像/mmexport1716718117353.jpg",
            "images/人像/mmexport1716718112895.jpg",
            "images/人像/IMG_20240601_201239.jpg",
            "images/人像/IMG_20240503_220159.jpg",
            "images/人像/IMG_20240111_121256.jpg"
          ])
        }
      ],
      "静物": [
        {
          "title": "静物摄影",
          "desc": "静态物体与光影构图",
          "type": "album",
          "src": "images/静物",
          "img": "images/静物/MEITU_20240906_021953952.jpg",
          "fullDesc": "静物摄影作品集，通过构图与光影捕捉日常物体的独特美感，展现静物的纹理、色彩与静谧氛围。",
          "slides": shuffle([
            "images/静物/20250316135030_IMG_2378.JPG",
            "images/静物/MEITU_20240906_021953952.jpg",
            "images/静物/IMG_3528.JPG",
            "images/静物/IMG_3495.JPG",
            "images/静物/IMG_20240910_231856.jpg",
            "images/静物/IMG_20240910_230621.jpg",
            "images/静物/IMG_20240905_153949.jpg",
            "images/静物/IMG_20240905_145852.jpg",
            "images/静物/retouch_2025083018425563.jpg",
            "images/静物/retouch_2025082303212401.png",
            "images/静物/retouch_2025032222332394.png",
            "images/静物/IMG_20250830_185531.jpg",
            "images/静物/IMG_20250302_031811.jpg",
            "images/静物/IMG_20250222_111358.jpg",
            "images/静物/IMG_20250222_005535.jpg",
            "images/静物/IMG_20241125_205316.jpg",
            "images/静物/IMG_20241125_203553.jpg",
            "images/静物/20250221215727_IMG_1756.JPG",
            "images/静物/20241213192810_IMG_1230.JPG",
            "images/静物/retouch_2025100100141420.png",
            "images/静物/retouch_2025092202343392.png",
            "images/静物/IMG_20251001_002547.png",
            "images/静物/KAPI_富士-NC_260129095307409.jpg",
            "images/静物/KAPI_富士-NC_260129095144435.jpg",
            "images/静物/IMG_20260329_234141.jpg",
            "images/静物/IMG_20251130_115817.jpg",
            "images/静物/fj__1780072380713_1.JPG",
            "images/静物/retouch_2026060721225753.jpg"
          ])
        }
      ],
      "风景": [
        {
          "title": "风景摄影",
          "desc": "自然景观与城市风光",
          "type": "album",
          "src": "images/风景",
          "img": "images/风景/20231221151712_MVI_02202.png",
          "fullDesc": "风景摄影作品集，记录山川湖海的壮阔与城市天际线的变幻，展现自然与人文的视觉对话。",
          "slides": shuffle([
            "images/风景/synthesis_3a9d6752-1db0-4c37-9ffb-7b865f88cef9_image_save_local1773510165475.jpg",
            "images/风景/MEITU_20251208_035433329.jpg",
            "images/风景/IMG_20260504_141537.jpg",
            "images/风景/IMG_20260404_165539.jpg",
            "images/风景/IMG_20260328_015443.jpg",
            "images/风景/IMG_20260312_174719.jpg",
            "images/风景/IMG_1193.JPG",
            "images/风景/IMG_0281.JPG",
            "images/风景/mmexport1756059388897.jpg",
            "images/风景/mmexport1756051912323.jpg",
            "images/风景/KAPI_XT30_250818013145272.jpg",
            "images/风景/IMG_20251130_115013.jpg",
            "images/风景/IMG_20250925_143308.jpg",
            "images/风景/IMG_20250817_153926.jpg",
            "images/风景/IMG_20250817_152846.jpg",
            "images/风景/IMG_20250817_152444.jpg",
            "images/风景/IMG_20250605_011346.jpg",
            "images/风景/MVIMG_20240614_150526.jpg",
            "images/风景/mmexport1703733526326.jpg",
            "images/风景/IMG_20250324_171033.jpg",
            "images/风景/IMG_20250302_090813.jpg",
            "images/风景/IMG_20250103_074455.jpg",
            "images/风景/IMG_20241207_155401.jpg",
            "images/风景/IMG_20240812_215520.jpg",
            "images/风景/IMG_20240812_191216.jpg",
            "images/风景/IMG_20240727_183659.jpg",
            "images/风景/IMG_20240529_133620.jpg",
            "images/风景/IMG_20240210_165542.jpg",
            "images/风景/IMG_20240120_195806.jpg",
            "images/风景/IMG_20240111_190802.jpg",
            "images/风景/IMG_20231227_010130.jpg",
            "images/风景/HDR_20250730_005400.jpg",
            "images/风景/20250316144133_IMG_2490.JPG",
            "images/风景/20250316143227_IMG_2450.JPG",
            "images/风景/retouch_2023122117143547_2569575526-21087900121766176.jpg",
            "images/风景/IMG_20231224_163321.jpg",
            "images/风景/IMG_20231121_162117.jpg",
            "images/风景/IMG_20231017_180930.jpg",
            "images/风景/IMG_20230908_175958.jpg",
            "images/风景/20231221151712_MVI_02202.png",
            "images/风景/IMG_20260504_194111.jpg",
            "images/风景/IMG_20260504_194006.JPG",
            "images/风景/retouch_2026042519185400.jpg",
            "images/风景/IMG_20241228_213655.jpg"
          ])
        }
      ],
      "现场": [
        {
          "title": "现场摄影",
          "desc": "活动纪实与现场捕捉",
          "type": "album",
          "src": "images/现场",
          "img": "images/现场/IMG_20240608_230826.jpg",
          "fullDesc": "现场摄影作品集，记录各类活动与现场瞬间的真实氛围，通过镜头捕捉人与环境的鲜活互动。",
          "slides": shuffle([
            "images/现场/IMG_20260509_235107.jpg",
            "images/现场/IMG_20260503_192113.jpg",
            "images/现场/IMG_20260503_190711.jpg",
            "images/现场/IMG_20260101_212055.jpg",
            "images/现场/IMG_20260101_191517.jpg",
            "images/现场/IMG_20251129_204705.jpg",
            "images/现场/IMG_20251129_204109.jpg",
            "images/现场/IMG_20251109_180018.jpg",
            "images/现场/IMG_20251109_174521.jpg",
            "images/现场/retouch_2025042711131933.jpg",
            "images/现场/retouch_2025041321503225.jpg",
            "images/现场/mmexport1745685925050.jpg",
            "images/现场/IMG_20250712_200354.jpg",
            "images/现场/20250413153437_IMG_3950.JPG",
            "images/现场/retouch_2025041321503472.jpg",
            "images/现场/MVIMG_20250405_200626.jpg",
            "images/现场/20250413192525_IMG_4028.JPG",
            "images/现场/mmexport1731252530955.jpg",
            "images/现场/IMG_20241111_002154.jpg",
            "images/现场/IMG_20241109_221701.jpg",
            "images/现场/IMG_20240725_120516.jpg",
            "images/现场/IMG_20240608_230826.jpg",
            "images/现场/000005.jpg"
          ])
        }
      ]
    }
  },
  "media": {
    "num": "04",
    "title": "新媒体作品",
    "subtitle": "HIGHLIGHTS",
    "desc": "高流量内容拆解、网格排版及核心数据复盘与 H5 互动探索",
    "categories": {
      "新媒体运营": [
        {
          "title": "专辑封面仿拍",
          "desc": "小红书 · 点赞317 · 浏览4500+",
          "type": "link",
          "src": "http://xhslink.com/o/5Gxejum5zNT",
          "img": "",
          "fullDesc": "以专辑封面风格仿拍系列，通过高对比视觉与极简构图，打造具有独立音乐美学的内容产品展示。",
          "platform": "小红书",
          "likes": "317",
          "views": "4500+",
          "emoji": "🎵"
        },
        {
          "title": "音乐人格测试",
          "desc": "小红书 · 点赞125 · 浏览2000+",
          "type": "link",
          "src": "http://xhslink.com/o/AuT2r5XQKKz",
          "img": "",
          "fullDesc": "以音乐人格测试热点内容，融合音乐、情感分析、人格标签化呈现，具备内容互动感。",
          "platform": "小红书",
          "likes": "125",
          "views": "2000+",
          "emoji": "🎼"
        },
        {
          "title": "歌曲测试",
          "desc": "小红书 · 点赞收藏800+ · 浏览1w+",
          "type": "link",
          "src": "http://xhslink.com/o/7XUlkGCPeeE",
          "img": "",
          "fullDesc": "音乐品味测试系列，以测试的方式展现歌曲内容创作，带来高互动量内容。",
          "platform": "小红书",
          "likes": "800+",
          "views": "1w+",
          "emoji": "🎧"
        },
        {
          "title": "物料设计分享",
          "desc": "小红书 · 点赞收藏1100+ · 浏览1w+",
          "type": "link",
          "src": "http://xhslink.com/o/4uoqgYC4feO",
          "img": "",
          "fullDesc": "物料设计灵感与教程类内容，结合海报、设计理念与物料设计的高度关联，产出高质量物料内容。",
          "platform": "小红书",
          "likes": "1100+",
          "views": "1w+",
          "emoji": "✏️"
        },
        {
          "title": "泡泡玛特盲盒分享",
          "desc": "小红书 · 点赞收藏500+ · 浏览1w+",
          "type": "link",
          "src": "http://xhslink.com/o/8iyGZk952ER",
          "img": "",
          "fullDesc": "以泡泡玛特IP产品，通过开箱展示，呈现潮玩与设计的趣味内容。",
          "platform": "小红书",
          "likes": "500+",
          "views": "1w+",
          "emoji": "🎁"
        },
        {
          "title": "泡泡玛特盲盒分享",
          "desc": "抖音 · 点赞收藏700+ · 浏览1.5w+",
          "type": "link",
          "src": "https://open.douyin.com/player/video?vid=7600786672075037093&autoplay=0",
          "img": "",
          "fullDesc": "抖音版泡泡玛特盲盒开箱视频，动态剪辑结合。",
          "platform": "抖音",
          "likes": "700+",
          "views": "1.5w+",
          "emoji": "📱"
        }
      ],
      "网页作品": [
        {
          "title": "音乐人格图谱测试",
          "desc": "H5 交互体验与多维人格量化分析",
          "type": "web",
          "src": "https://subway814.github.io/qfti/",
          "img": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
          "fullDesc": "基于行为心理学与声学感知量化的一元 H5 独立网站应用。提供十余项融合音乐片段、色彩通感和空间维度的互动题目，并在结算页渲染出基于极简数据网格 and 独特色彩占比的大型图鉴。项目采用流式页面架构，整体视听极为沉浸。(点击展开后可在弹窗内直接在线浏览与互动)"
        },
        {
          "title": "灵魂光谱音乐人格测试",
          "desc": "沉浸式深色系氛围音乐量化站点",
          "type": "web",
          "src": "https://subway814.github.io/SODAMEtest/",
          "img": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
          "fullDesc": "结合了深色视觉底色、高饱和度粒子发生发光光谱、以及高灵敏度空间环境伴奏音。旨在通过渐进式的性格问题引导与白噪声配乐 of 组合，解码用户性格深处的频率律动。整个计算引擎优雅敏捷，输出具有高收藏价值的光谱报告。(点击展开后可在弹窗内直接在线浏览与互动)"
        }
      ]
    }
  },
  "contact": {
    "num": "05",
    "title": "取得联系",
    "subtitle": "CONNECT",
    "desc": "个人优势、设计哲学、精通全链路技能工具以及中英双语简历下载",
    "items": [
      {
        "title": "取得联系",
        "desc": "期待与你共同探索设计生命力",
        "type": "html",
        "src": "custom_contact",
        "img": "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
};

export function getBilibiliEmbedUrl(url: string): string | null {
  const match = url.match(/BV[a-zA-Z0-9]+/i);
  if (match) {
    return `https://player.bilibili.com/player.html?bvid=${match[0]}&page=1&high_quality=1&danmaku=1&as_wide=1&autoplay=0`;
  }
  return null;
}

export function getDouyinEmbedUrl(url: string): string | null {
  // Match vid= parameter from open.douyin.com player URLs
  const vidMatch = url.match(/[?&]vid=(\d+)/i);
  if (vidMatch) {
    return `https://open.douyin.com/player/video?vid=${vidMatch[1]}&autoplay=0`;
  }
  // Match pure numeric vid string
  const pureVidMatch = url.match(/^(\d{15,})$/);
  if (pureVidMatch) {
    return `https://open.douyin.com/player/video?vid=${pureVidMatch[1]}&autoplay=0`;
  }
  // Match Douyin share URL like https://v.douyin.com/d2mKQCtqk18/
  const douyinMatch = url.match(/v\.douyin\.com\/([a-zA-Z0-9]+)/i);
  if (douyinMatch) {
    return `https://open.douyin.com/player/video?vid=7600786672075037093&autoplay=0`;
  }
  // Also check for direct douyin.com URLs
  const directMatch = url.match(/douyin\.com\/video\/(\d+)/i);
  if (directMatch) {
    return `https://open.douyin.com/player/video?vid=${directMatch[1]}&autoplay=0`;
  }
  return null;
}

export const ALBUM_IMAGES = [
  "docs/专辑/p0.png",
  "docs/专辑/p1.png",
  "docs/专辑/p2.png",
  "docs/专辑/p3.png",
  "docs/专辑/p3(2).png",
  "docs/专辑/p4.png",
  "docs/专辑/p4(2).png",
  "docs/专辑/p5.png",
  "docs/专辑/p5（2）.png",
  "docs/专辑/p6.png",
  "docs/专辑/p6(2).jpg",
  "docs/专辑/p7（1）.png",
  "docs/专辑/p7（2）.png",
  "docs/专辑/p8（1）.png",
  "docs/专辑/p8（2）.png",
  "docs/专辑/p16.png"
];
