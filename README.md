<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>时间碎片实验室</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        /* CSS变量定义 */
        :root {
            --primary-gradient: linear-gradient(90deg, #00d2ff, #3a7bd5);
            --secondary-color: #00f7ff;
            --dark-bg: #0f0f1a;
            --card-bg: rgba(255, 255, 255, 0.05);
            --border-radius: 10px;
        }

        * { 
            margin:0; 
            padding:0; 
            box-sizing:border-box;
            scroll-behavior: smooth;
        }
        body { 
            overflow-x:hidden; 
            color:#fff; 
            font-family:sans-serif; 
            background:var(--dark-bg);
            position: relative;
        }
        #particles-js {
            position:fixed; 
            z-index:-1; 
            width:100%; 
            height:100%; 
            top:0; 
            left:0;
            background:linear-gradient(135deg,#0f0c29,#302b63,#24243e)
        }
        .container { 
            max-width:1200px; 
            margin:0 auto; 
            padding:20px;
            animation: fadeIn 0.5s ease-out;
        }
        
        /* 导航样式优化 */
        header {
            display:flex; 
            justify-content:space-between; 
            align-items:center;
            padding:20px 0; 
            border-bottom:1px solid rgba(255,255,255,0.1)
        }
        .logo {
            display:flex; 
            align-items:center; 
            animation:pulse 2s infinite
        }
        .logo img {
            width:50px; 
            height:50px; 
            margin-right:15px;
            filter:drop-shadow(0 0 10px rgba(100,149,237,0.7))
        }
        nav ul { 
            display:flex; 
            list-style:none 
        }
        nav ul li { 
            margin:0 15px; 
            position:relative 
        }
        nav ul li a {
            color:#ddd; 
            text-decoration:none; 
            font-size:16px;
            transition:all 0.3s; 
            padding:5px 10px; 
            border-radius:4px;
            position: relative;
        }
        nav ul li a:hover {
            color:var(--secondary-color); 
            background:rgba(255,255,255,0.1);
            text-shadow:0 0 10px rgba(0,247,255,0.3);
        }
        nav ul li a::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background: var(--secondary-color);
            transition: all 0.3s ease;
        }
        nav ul li a:hover::after {
            width: 100%;
        }
	.cta-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 25px;
    margin: 60px 0;
    z-index: 2;
    position: relative;
    animation: fadeIn 0.5s ease-out;
}

.cta-buttons a {
    display: inline-block;
    padding: 16px 32px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background: var(--primary-gradient);
    border-radius: var(--border-radius);
    text-decoration: none;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(58, 123, 213, 0.3);
}

.cta-buttons a:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(58, 123, 213, 0.5);
    background: linear-gradient(90deg, #3a7bd5, #00d2ff);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.btn-secondary {
    background: var(--secondary-color);
}

.btn-secondary:hover {
    background: #00f7ff;
    box-shadow: 0 10px 20px rgba(0, 247, 255, 0.5);
}
        /* 英雄区样式 */
        .hero {
            text-align:center; 
            padding:100px 0 80px; 
            position:relative;
            background:var(--primary-gradient);
            -webkit-background-clip:text; 
            -webkit-text-fill-color:transparent;
            text-shadow:0 0 20px rgba(58,123,213,0.3);
            z-index: 1;
        }
        .hero p { 
            max-width:800px; 
            margin:20px auto 40px; 
            line-height:1.6; 
            color:#ccc 
        }

        /* 特色板块优化 */
        .features {
            display:grid; 
            grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
            gap:30px; 
            margin:80px 0;
        }
        .feature-card {
            background:var(--card-bg); 
            border-radius:var(--border-radius);
            padding:30px; 
            transition:all 0.3s ease;
            border:1px solid rgba(255,255,255,0.1);
            position: relative;
            overflow: hidden;
        }
        .feature-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(0,247,255,0.1) 0%, transparent 70%);
            transform: rotate(25deg);
        }
        .feature-card:hover {
            transform:translateY(-10px); 
            box-shadow:0 10px 30px rgba(0,210,255,0.2);
        }

        /* 团队成员样式优化 */
        .team-members {
            display:grid; 
            grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
            gap:30px; 
            margin:50px 0;
        }
        .team-member {
            background:var(--card-bg); 
            border-radius:var(--border-radius);
            padding:30px; 
            transition:all 0.3s ease;
            border:1px solid rgba(255,255,255,0.1);
            overflow: hidden;
        }
        .member-avatar {
            width:120px; 
            height:120px; 
            border-radius:50%;
            border:3px solid #00d2ff; 
            margin:0 auto 20px;
            overflow:hidden; 
            transition:transform 0.3s ease;
            position: relative;
        }
        .member-avatar::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(0,210,255,0.5);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .member-avatar:hover {
            transform:scale(1.1);
        }
        .member-avatar:hover::after {
            opacity: 1;
        }

        /* 项目展示优化 */
        .projects-grid {
            display:grid; 
            grid-template-columns:repeat(auto-fit,minmax(350px,1fr));
            gap:30px; 
            margin:50px 0;
        }
        .project-card {
            background:var(--card-bg); 
            border-radius:var(--border-radius);
            overflow:hidden; 
            transition:all 0.3s ease;
            border:1px solid rgba(255,255,255,0.1);
            display: flex;
            flex-direction: column;
        }
        .project-image { 
            height:200px; 
            overflow:hidden;
            position: relative;
        }
        .project-image::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.5));
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .project-image img { 
            width:100%; 
            height:100%; 
            object-fit:cover; 
            transition:transform 0.5s ease;
        }
        .project-card:hover .project-image img { 
            transform:scale(1.1) 
        }
        .project-card:hover .project-image::after {
            opacity: 1;
        }

        /* 音乐播放器优化 */
        #musicPlayer {
            position:fixed; 
            bottom:20px; 
            right:20px; 
            background:rgba(255,255,255,0.1);
            border-radius:var(--border-radius); 
            padding:15px; 
            display:flex; 
            flex-direction:column;
            gap:10px; 
            backdrop-filter:blur(10px); 
            z-index:1000; 
            width:240px;
            box-shadow:0 5px 25px rgba(0,0,0,0.3); 
            cursor:move;
            transition: all 0.3s ease;
        }
        #musicPlayer:hover {
            transform: scale(1.02);
        }
        .music-controls { 
            display:flex; 
            justify-content:space-between;
            align-items: center;
        }
        .music-btn {
            width:36px; 
            height:36px; 
            border-radius:4px;
            background:rgba(0,247,255,0.2); 
            border:none;
            color:#fff; 
            cursor:pointer; 
            transition:all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .music-btn:hover { 
            background:rgba(0,247,255,0.5); 
            transform: scale(1.1);
            box-shadow: 0 0 10px rgba(0,247,255,0.5);
        }
        .now-playing {
            font-size:13px; 
            color:#ddd; 
            white-space:nowrap;
            overflow:hidden; 
            text-overflow:ellipsis; 
            text-align:center;
            min-height: 1.5em;
        }
        .playback-controls {
            display: flex;
            gap: 10px;
        }

        @keyframes pulse { 
            0% { transform:scale(1) } 
            50% { transform:scale(1.1) } 
        }
        @keyframes fadeIn {
            from {opacity: 0;} to {opacity: 1;}
        }
    </style>
</head>
<body>
    <div id="particles-js"></div>
    
    <!-- 主体内容 -->
    <div class="container">
        <!-- 导航栏 -->
        <header>
            <div class="logo">
                <img src="asset/images/17.png" alt="时间碎片实验室logo">
                <div class="logo-text">
                    <h1 style="background:var(--primary-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">时间碎片实验室</h1>
                    <p style="color:#aaa;">Timepiece Laboratory</p>
                </div>
            </div>
            <nav>
                <ul>
                    <li><a href="text.html">首页</a></li>
                    <li><a href="pages/YanJiuFX.html">研究方向</a></li>
                    <li><a href="pages/grjs.html">团队成员</a></li>
                    <li><a href="pages/tdcg.html">团队成果</a></li>
                    <li><a href="https://qm.qq.com/q/9V7tPQq590">联系我们</a></li>
                </ul>
            </nav>
        </header>

        <!-- 英雄区域 -->
        <section class="hero">
            <h2>探索科技的无限可能</h2>
            <p>时间碎片实验室由四位来自不同领域的科研爱好者组成，致力于人工智能、集成电路、物联网领域的交叉研究。我们相信，通过跨学科的合作与创新，能够推动科技进步，解决人类面临的重大挑战。</p>

        </section>
<section class="cta-buttons">
    <a href=https://qm.qq.com/q/9V7tPQq590" class="btn-primary">加入我们</a>
    <a href="pages/Laboratory Online Tools.html" class="btn-secondary">实验室工具</a>
</section>

        <!-- 特色板块 -->
        <section class="features">
            <div class="feature-card">
                <div style="width:60px;height:60px;background:var(--primary-gradient);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                   ⚛️
                </div>
                <h3>集成电路</h3>
                <p>通过控制晶体管的开关状态来实现信号的处理和传输，从而完成各种复杂的逻辑运算和数据处理任务。</p>
            </div>
            <div class="feature-card">
                <div style="width:60px;height:60px;background:var(--primary-gradient);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                    🧠
                </div>
                <h3>人工智能</h3>
                <p>我们研究深度学习、强化学习和神经科学交叉领域，开发具有类人认知能力的下一代AI系统。</p>
            </div>
            <div class="feature-card">
                <div style="width:60px;height:60px;background:var(--primary-gradient);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                    💻
                </div>
                <h3>物联网</h3>
                <p>利用各种传感器将物体与互联网相联系，按照一定规则进行数据交互和通信，以实现智能化识别、定位、跟踪、监控和管理。</p>
            </div>
        </section>

        <!-- 团队成员 -->
        <section>
            <h2 style="text-align:center;margin:50px 0; background:var(--primary-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">我们的团队</h2>
            <div class="team-members">
                <div class="team-member">
                    <div class="member-avatar">
                        <img src="asset/images/5.jpg" alt="陈一菲" style="object-fit: cover; width: 100%; height: 100%;">
                    </div>
                    <h3>陈一菲</h3>
                    <p style="color:var(--secondary-color);">人工智能精英</p>
                    <p style="color:#aaa;">来自应电2301班，擅长各种编程语言，熟悉各种数据结构和算法。</p>
                    <div class="social-links" style="display:flex;justify-content:center;gap:15px;margin-top:15px;">
                        <a href="https://qm.qq.com/q/9V7tPQq590" style="color:#aaa;"><i class="fab fa-qq"></i></a>
                        <a href="https://qm.qq.com/q/9V7tPQq590" style="color:#aaa;"><i class="fab fa-weixin"></i></a>
                    </div>
                </div>
                <div class="team-member">
                    <div class="member-avatar">
                        <img src="asset/images/4.jpg" alt="储天溢" style="object-fit: cover; width: 100%; height: 100%;">
                    </div>
                    <h3>储天溢</h3>
                    <p style="color:var(--secondary-color);">集成电路爱好者</p>
                    <p style="color:#aaa;">熟悉各种数字电路和模拟电路，尤其擅长集成电路的调试与修复。</p>
                    <div class="social-links" style="display:flex;justify-content:center;gap:15px;margin-top:15px;">
                        <a href="https://qm.qq.com/q/9V7tPQq590" style="color:#aaa;"><i class="fab fa-qq"></i></a>
                        <a href="https://qm.qq.com/q/9V7tPQq590" style="color:#aaa;"><i class="fab fa-weixin"></i></a>
                    </div>
                </div>
                <div class="team-member">
                    <div class="member-avatar">
                        <img src="asset/images/7.jpg" alt="张嘉仪" style="object-fit: cover; width: 100%; height: 100%;">
                    </div>
                    <h3>张嘉仪</h3>
                    <p style="color:var(--secondary-color);">物联网项目爱好者</p>
                    <p style="color:#aaa;">擅长做各种物联网项目，并且把这些项目发布在github。</p>
                    <div class="social-links" style="display:flex;justify-content:center;gap:15px;margin-top:15px;">
                        <a href="https://qm.qq.com/q/9V7tPQq590" style="color:#aaa;"><i class="fab fa-qq"></i></a>
                        <a href="https://qm.qq.com/q/9V7tPQq590" style="color:#aaa;"><i class="fab fa-weixin"></i></a>
                    </div>
                </div>
                <div class="team-member">
                    <div class="member-avatar">
                        <img src="asset/images/6.jpg" alt="朱凯" style="object-fit: cover; width: 100%; height: 100%;">
                    </div>
                    <h3>朱凯</h3>
                    <p style="color:var(--secondary-color);">机器学习研究者</p>
                    <p style="color:#aaa;">喜欢钻研机器学习方面的问题尤其是深度学习，同时也会一些计算机视觉的应用</p>
                    <div class="social-links" style="display:flex;justify-content:center;gap:15px;margin-top:15px;">
                        <a href="https://qm.qq.com/q/9V7tPQq590" style="color:#aaa;"><i class="fab fa-qq"></i></a>
                        <a href="https://qm.qq.com/q/9V7tPQq590" style="color:#aaa;"><i class="fab fa-weixin"></i></a>
                    </div>
                </div>
            </div>
        </section>

        <!-- 项目展示 -->
        <section>
            <h2 style="text-align:center;margin:50px 0;background:var(--primary-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">近期项目</h2>
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-image">
                        <img src="asset/images/19.png" alt="穿云鹰眼">
                    </div>
                    <div style="padding:20px; display: flex; flex-direction: column; flex: 1;">
                        <h3>穿云鹰眼</h3>
                        <p>这是一款基于Yolov8和FPV的绝缘子检测系统，用户可以在导入图片/视频文件后实时检测绝缘子，当然也可以通过打开挂载在FPV上的摄像头实时监测</p>
                        <div style="display:flex;flex-wrap:wrap;gap:10px;margin:15px 0;">
                            <span style="background:rgba(0,210,255,0.1);color:var(--secondary-color);padding:5px 10px;border-radius:20px;font-size:12px;">自研系统</span>
                            <span style="background:rgba(0,210,255,0.1);color:var(--secondary-color);padding:5px 10px;border-radius:20px;font-size:12px;">人工智能</span>
                        </div>
                        <a href="mp4/1.mp4" style="color:var(--secondary-color);text-decoration:none;margin-top:auto;">查看详情 →</a>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-image">
                        <img src="asset/images/18.png" alt="基于yolov8的窨井盖检测系统">
                    </div>
                    <div style="padding:20px; display: flex; flex-direction: column; flex: 1;">
                        <h3>基于yolov8的窨井盖检测系统</h3>
                        <p>我们团队自主开发的一套基于yolov8的窨井盖检测系统，可以检测识别各种类型的井盖，并且可以部署到机载计算机，实现无人机巡检窨井盖的功能。</p>
                        <div style="display:flex;flex-wrap:wrap;gap:10px;margin:15px 0;">
                            <span style="background:rgba(0,210,255,0.1);color:var(--secondary-color);padding:5px 10px;border-radius:20px;font-size:12px;">深度学习</span>
                            <span style="background:rgba(0,210,255,0.1);color:var(--secondary-color);padding:5px 10px;border-radius:20px;font-size:12px;">人工智能</span>
                        </div>
                        <a href="mp4/2.mp4" style="color:var(--secondary-color);text-decoration:none;margin-top:auto;">查看详情 →</a>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-image">
                        <img src="asset/images/20.png" alt="自主组装的五寸穿越机">
                    </div>
                    <div style="padding:20px; display: flex; flex-direction: column; flex: 1;">
                        <h3>自主组装的五寸穿越机</h3>
                        <p>我们团队自主组装了大疆N3飞行眼镜、大疆O4 Pro天空端和五寸穿越机</p>
                        <div style="display:flex;flex-wrap:wrap;gap:10px;margin:15px 0;">
                            <span style="background:rgba(0,210,255,0.1);color:var(--secondary-color);padding:5px 10px;border-radius:20px;font-size:12px;">FPV</span>
                            <span style="background:rgba(0,210,255,0.1);color:var(--secondary-color);padding:5px 10px;border-radius:20px;font-size:12px;">物联网</span>
                        </div>
                        <a href="mp4/3.mp4" style="color:var(--secondary-color);text-decoration:none;margin-top:auto;">查看详情 →</a>
                    </div>
                </div>
            </div>
        </section>
    </div>

<!--团队活动-->
 <section>
            <h2 style="text-align:center;margin:50px 0;background:var(--primary-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">团队活动</h2>
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-image">
                        <img src="asset/images/1.png" alt="挑战杯校赛">
                    </div>
                    <div style="padding:20px; display: flex; flex-direction: column; flex: 1;">
                        <h3>挑战杯校赛</h3>
                        <p>本次竞赛中，时间碎片的团队成员们参与的是 “人工智能 +” 专项赛赛道，带来的项目 “穿云鹰眼: AI 赋能穿越机的高压电线绝缘子智能巡检方案”极具创新性与实用性。</p>
                        <div style="display:flex;flex-wrap:wrap;gap:10px;margin:15px 0;">
                            <span style="background:rgba(0,210,255,0.1);color:var(--secondary-color);padding:5px 10px;border-radius:20px;font-size:12px;">挑战杯</span>
                            <span style="background:rgba(0,210,255,0.1);color:var(--secondary-color);padding:5px 10px;border-radius:20px;font-size:12px;">人工智能+赛道</span>
                        </div>
                        <a href="https://mp.weixin.qq.com/s/1QG9iAfkISlKnmEK2M2gWA" >查看详情 →</a>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-image">
                        <img src="asset/images/2.png" alt="大学生人工智能创新应用选拔赛">
                    </div>
                    <div style="padding:20px; display: flex; flex-direction: column; flex: 1;">
                        <h3>大学生人工智能创新应用选拔赛</h3>
                        <p>为激发AI创新热情，培育未来科技火种，助力产学研融合，托举智能时代新星。时间碎片社联合集慧创芯社举办了大学生人工智能创新应用选拔赛。众多参赛选手围绕人工智能在多个领域的应用展开激烈角逐，充分展现了当代学子的卓越风采！</p>
                        <div style="display:flex;flex-wrap:wrap;gap:10px;margin:15px 0;">
                            <span style="background:rgba(0,210,255,0.1);color:var(--secondary-color);padding:5px 10px;border-radius:20px;font-size:12px;">人工智能赛</span>
                            <span style="background:rgba(0,210,255,0.1);color:var(--secondary-color);padding:5px 10px;border-radius:20px;font-size:12px;">社团活动</span>
                        </div>
                        <a href="https://mp.weixin.qq.com/s/2OCB77jkeABCpUo4ju9ILA" >查看详情 →</a>
                    </div>
                </div>
            </div>
        </section>

    <!-- 音乐播放器 -->
    <div id="musicPlayer">
        <div class="now-playing" id="now-playing">加载中...</div>
        <div class="music-controls">
            <audio id="audio" preload="metadata"></audio>
            <div class="playback-controls">
                <button class="music-btn" id="prev-btn" title="上一首">⏮️</button>
                <button class="music-btn" id="play-pause-btn" title="播放/暂停">▶️</button>
                <button class="music-btn" id="next-btn" title="下一首">⏭️</button>
            </div>
        </div>
    </div>

    <!-- 粒子脚本 -->
    <script>
        // 粒子配置优化
        const particlesConfig = {
            "particles": {
                "number": {"value": 100, "density": {"enable": true, "value_area": 800}},
                "color": {"value": ["#00d2ff", "#3a7bd5"]},
                "shape": {"type": "circle"}, 
                "opacity": {
                    "value": 0.6, "random": true,
                    "anim": {"enable": true, "speed": 1, "opacity_min": 0.1, "sync": false}
                },
                "size": {
                    "value": 3, "random": true,
                    "anim": {"enable": true, "speed": 2, "size_min": 0.3, "sync": false}
                },
                "line_linked": {
                    "enable": true, "distance": 120,
                    "color": "#ffffff", "opacity": 0.3, "width": 1
                },
                "move": {
                    "enable": true, "speed": 1.5, "direction": "none",
                    "random": true, "straight": false, "out_mode": "bounce",
                    "attract": {"enable": true, "rotateX": 600, "rotateY": 1200}
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {"enable": true, "mode": "grab"},
                    "onclick": {"enable": true, "mode": "bubble"},
                    "resize": true
                },
                "modes": {
                    "grab": {"distance": 140, "line_linked": {"opacity": 0.8}},
                    "bubble": {"distance": 200, "size": 6, "duration": 2, "opacity": 0.8, "speed": 3}
                }
            },
            "retina_detect": true
        };

        // 初始化粒子
        window.addEventListener('load', function() {
            if (window.particlesJS) {
                particlesJS('particles-js', particlesConfig);
            }
        });
    </script>

    <!-- 动画和播放器脚本优化 -->
    <script>
        // 卡片动画优化
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.querySelectorAll('.feature-card, .team-member, .project-card');
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(40px)';
                el.style.transition = 'all 0.6s ease-out';
                observer.observe(el);
            });
        });

        // 音乐播放器优化
        const songs = [
            { title: "天空之城", src: "mp3/1.m4a" },
            { title: "月光1", src: "mp3/yueguang1.mp3" },
            { title: "月光2", src: "mp3/yueguang2.mp3" },
            { title: "月光3", src: "mp3/yueguang3.mp3" },
            { title: "Fish", src: "mp3/fish.mp3" }
        ];
        const audio = document.getElementById('audio');
        const nowPlaying = document.getElementById('now-playing');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        let currentSong = 0;
        let isPlaying = false;

        function updatePlayButton() {
            playPauseBtn.innerHTML = isPlaying ? '⏸️' : '▶️';
        }

        function playSong(index) {
            currentSong = (index + songs.length) % songs.length;
            const song = songs[currentSong];
            audio.src = song.src;
            audio.load();
            audio.play().then(() => {
                isPlaying = true;
                updatePlayButton();
                nowPlaying.textContent = `正在播放: ${song.title}`;
            }).catch(err => {
                console.error('播放错误:', err);
                nowPlaying.textContent = `播放失败: ${song.title}`;
                isPlaying = false;
                updatePlayButton();
            });
        }

        // 初始化播放第一首
        playSong(0);

        // 歌曲结束时自动播放下一首
        audio.addEventListener('ended', () => playSong(currentSong + 1));

        // 播放/暂停按钮点击事件
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
            } else {
                audio.play().catch(err => {
                    console.error('播放错误:', err);
                    nowPlaying.textContent = `播放失败: ${songs[currentSong].title}`;
                });
                isPlaying = true;
            }
            updatePlayButton();
        });

        // 上一曲按钮点击事件
        prevBtn.addEventListener('click', () => playSong(currentSong - 1));

        // 下一曲按钮点击事件
        nextBtn.addEventListener('click', () => playSong(currentSong + 1));

        // 拖拽功能优化
        const player = document.getElementById('musicPlayer');
        let isDragging = false, offsetX, offsetY;

        player.addEventListener('mousedown', e => {
            if (e.target === player || e.target === nowPlaying) {
                isDragging = true;
                const rect = player.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - offsetY;
                player.style.transition = 'none';
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            let left = e.clientX - offsetX;
            let top = e.clientY - offsetY;
            left = Math.max(0, Math.min(left, window.innerWidth - player.offsetWidth));
            top = Math.max(0, Math.min(top, window.innerHeight - player.offsetHeight));
            player.style.left = left + 'px';
            player.style.top = top + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            player.style.transition = 'all 0.3s ease';
        });

        // 错误处理
        audio.addEventListener('error', () => {
            nowPlaying.textContent = `加载失败: ${songs[currentSong].title}`;
            setTimeout(() => playSong(currentSong + 1), 2000);
        });

        // 窗口大小变化重置播放器位置
        window.addEventListener('resize', () => {
            const rect = player.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                player.style.left = 'auto';
                player.style.right = '20px';
            }
            if (rect.bottom > window.innerHeight) {
                player.style.top = 'auto';
                player.style.bottom = '20px';
            }
        });
    </script>

    <!-- 加载粒子库 -->
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
</body>
</html>
