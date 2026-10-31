const PETS = [
  { id: "dog", name: "奶糖", type: "小柯基", image: "assets/pets/dog.webp", price: 0, temperament: "外向好动", favoriteAction: "play", favoriteLocation: "meadow", activeWindow: [480, 1020], idleStyle: "sniff", voice: "轻快的短叫", bio: "喜欢草地和会滚动的东西。" },
  { id: "cat", name: "芝麻", type: "长毛猫", image: "assets/pets/cat.webp", adoptRep: 6, temperament: "谨慎亲人", favoriteAction: "pet", favoriteLocation: "home", activeWindow: [720, 1140], idleStyle: "groom", voice: "柔软的喵声", bio: "谨慎，但会主动靠近熟悉的人。" },
  { id: "rabbit", name: "团子", type: "垂耳兔", image: "assets/pets/rabbit.webp", adoptRep: 10, temperament: "安静敏感", favoriteAction: "feed", favoriteLocation: "meadow", activeWindow: [420, 780], idleStyle: "listen", voice: "细小的鼻音", bio: "对新鲜蔬菜和安静角落没有抵抗力。" },
  { id: "hamster", name: "布丁", type: "金丝熊", image: "assets/pets/hamster.webp", price: 85, temperament: "囤粮专家", favoriteAction: "treat", favoriteLocation: "home", activeWindow: [1020, 1290], idleStyle: "wash", voice: "急促的吱声", bio: "习惯把最喜欢的食物留到最后。" },
  { id: "poodle", name: "云朵", type: "小贵宾", image: "assets/pets/poodle.webp", price: 145, temperament: "讲究整洁", favoriteAction: "brush", favoriteLocation: "clinic", activeWindow: [540, 960], idleStyle: "prance", voice: "兴奋的轻吠", bio: "爱干净，也很在意每天的散步。" },
  { id: "fox", name: "栗子", type: "赤狐幼崽", image: "assets/pets/fox.webp", adoptRep: 22, temperament: "警觉好奇", favoriteAction: "play", favoriteLocation: "forest", activeWindow: [960, 1290], idleStyle: "listen", voice: "短促的鸣叫", bio: "从森林来到家园，仍然保持警觉。" },
  { id: "budgie", name: "青豆", type: "虎皮鹦鹉", image: "assets/pets/budgie.webp", price: 110, temperament: "活泼爱交流", favoriteAction: "play", favoriteLocation: "home", activeWindow: [480, 1020], idleStyle: "preen", voice: "轻快的啾鸣", bird: true, bio: "喜欢在高处观察，也会主动回应熟悉的声音。" },
  { id: "cockatiel", name: "米粒", type: "玄凤鹦鹉", image: "assets/pets/cockatiel.webp", adoptRep: 18, temperament: "亲人但敏感", favoriteAction: "pet", favoriteLocation: "meadow", activeWindow: [540, 990], idleStyle: "crest", voice: "柔和的口哨", bird: true, bio: "冠羽会诚实地表达情绪，雷声大时需要安静陪伴。" }
];

const LOCATIONS = {
  home: { name: "动物家园", kicker: "生活区", hint: "日常照料与伙伴相处", image: "assets/world/home.webp", icon: "icon-paw", color: "#3f7650", x: 48, y: 73, level: 1 },
  rescue: { name: "山谷救助站", kicker: "救助与领养", hint: "接收需要新家的动物", image: "assets/world/rescue.webp", icon: "icon-heart", color: "#b64d42", x: 18, y: 69, level: 1 },
  market: { name: "溪桥集市", kicker: "补给与交易", hint: "购买物资、动物和扩建", image: "assets/world/market.webp", icon: "icon-coin", color: "#b8832d", x: 23, y: 29, level: 1 },
  clinic: { name: "山谷诊所", kicker: "健康照管", hint: "处理需要检查的状况", image: "assets/rooms/clinic.webp", icon: "icon-cross", color: "#4b7680", x: 48, y: 36, level: 2 },
  meadow: { name: "风铃草甸", kicker: "散步与探索", hint: "白天常有动物经过", image: "assets/rooms/garden.webp", icon: "upgrade-plant", color: "#58864e", x: 76, y: 27, level: 2 },
  lakeside: { name: "芦湾湖畔", kicker: "湿地观察", hint: "沿着木栈道照看水边生灵", image: "assets/world/lakeside.webp", icon: "care-wash", color: "#3f7f8f", x: 67, y: 50, level: 2 },
  forest: { name: "杉木森林", kicker: "巡护区域", hint: "傍晚之后更需要留意", image: "assets/world/forest.webp", icon: "upgrade-plant", color: "#335844", x: 84, y: 68, level: 3 },
  training: { name: "伙伴训练场", kicker: "行为训练", hint: "通过运动和配合建立默契", image: "assets/world/training.webp", icon: "icon-paw", color: "#b85a43", x: 39, y: 54, level: 3 },
  highlands: { name: "云脊瞭望台", kicker: "高地巡察", hint: "观察山谷天气与迁徙踪迹", image: "assets/world/highlands.webp", icon: "icon-note", color: "#6b678d", x: 9, y: 39, level: 4 },
  saltmarsh: { name: "潮汐盐沼", kicker: "湿地保育", hint: "照看潮沟、鸟巢与涨落水位", image: "assets/world/saltmarsh.webp", icon: "care-wash", color: "#3f7b72", x: 93, y: 38, level: 5 },
  greenhouse: { name: "星灯温室", kicker: "夜间栖息", hint: "在玻璃穹顶下观察夜行伙伴", image: "assets/world/greenhouse.webp", icon: "upgrade-plant", color: "#8a6b4a", x: 61, y: 14, level: 6 }
};

const LOCATION_SCENE_DETAILS = {
  home: { foreground: ["饮水盆", "门垫", "晒暖的窗台"], distant: ["风铃轻响", "邻舍推车经过"], markers: ["室内温度 21°C", "饮水已更换"], texture: "木地板与编织垫" },
  rescue: { foreground: ["隔离围栏", "消毒托盘", "编号毛毯"], distant: ["值班员记录体重", "安置笼保持半开"], markers: ["安静区已留空", "备用灯已亮"], texture: "防滑橡胶地面" },
  market: { foreground: ["带盖粮箱", "称重台", "雨棚排水槽"], distant: ["摊主核对清单", "溪桥有行人经过"], markers: ["今日货单 08:20", "冷藏箱正常"], texture: "石板路与木摊" },
  clinic: { foreground: ["听诊台", "保温垫", "洗手池"], distant: ["护士调低候诊音量", "药柜标签整齐"], markers: ["候诊 1 位", "消毒计时 04:12"], texture: "浅色瓷砖与暖灯" },
  meadow: { foreground: ["低矮花环", "木桩标记", "浅水饮水点"], distant: ["蝴蝶掠过花茎", "远处有羊群铃声"], markers: ["草高 18 cm", "风向 东南"], texture: "湿润草地与碎石径" },
  lakeside: { foreground: ["浮漂箱", "木栈道护栏", "芦苇束"], distant: ["水鸟在浅滩觅食", "小船靠岸收网"], markers: ["水位 0.8 m", "栈道湿滑提示"], texture: "木板与浅水泥滩" },
  forest: { foreground: ["巡护路标", "松果堆", "溪边绳桥"], distant: ["啄木鸟敲击树干", "林下有小兽穿行"], markers: ["能见度 42 m", "溪水清澈"], texture: "落叶层与苔藓" },
  training: { foreground: ["软障碍", "召回铃", "奖励袋"], distant: ["教练记录步频", "备用路线已开放"], markers: ["今日风速 2 级", "地面干燥"], texture: "夯实砂土与草边" },
  highlands: { foreground: ["风向旗", "望远镜架", "保温水壶"], distant: ["云影越过山脊", "迁徙鸟群在远处盘旋"], markers: ["海拔 680 m", "阵风 14 km/h"], texture: "岩面、短草与木平台" },
  saltmarsh: { foreground: ["潮位尺", "鸟巢箱", "木栈桥"], distant: ["白鹭在浅滩觅食", "潮沟水面缓慢回流"], markers: ["潮位 0.62 m", "盐度 18‰"], texture: "泥滩、芦苇与防腐木" },
  greenhouse: { foreground: ["集水桶", "夜光标记", "藤架栖木"], distant: ["蛾类绕灯飞行", "值夜员记录温湿度"], markers: ["温度 19°C", "湿度 68%"], texture: "玻璃穹顶与湿润土壤" }
};

const SANCTUARY_LEVELS = [
  { level: 1, renown: 0, title: "新任照管员" },
  { level: 2, renown: 10, title: "山谷守护者" },
  { level: 3, renown: 25, title: "资深经营者" },
  { level: 4, renown: 45, title: "山谷管理人" },
  { level: 5, renown: 70, title: "湿地协调员" },
  { level: 6, renown: 100, title: "夜行观察长" },
  { level: 7, renown: 140, title: "山谷总管" }
];

const MAP_THEMES = [
  { id: "spring", label: "山谷昼景", note: "森林、湖畔与各地点总览", image: "assets/world/world-map.webp", mobileImage: "assets/world/world-map-mobile.webp", alt: "白天的山谷动物家园全局地图", positions: { market: [23, 29], lakeside: [67, 50], meadow: [76, 27], clinic: [48, 36], rescue: [18, 69], training: [39, 54], highlands: [9, 39], home: [48, 73], forest: [84, 68], saltmarsh: [93, 38], greenhouse: [61, 14] } },
  { id: "summer", label: "潮汐湿地", note: "水道、鸟岛与温室的新路线", image: "assets/world/world-map-wetlands.webp", mobileImage: "assets/world/world-map-wetlands-mobile.webp", alt: "潮汐湿地动物保育区全局地图", positions: { market: [12, 84], lakeside: [56, 51], meadow: [76, 27], clinic: [28, 22], rescue: [17, 18], training: [39, 72], highlands: [9, 28], home: [39, 31], forest: [89, 18], saltmarsh: [53, 43], greenhouse: [75, 23] } },
  { id: "autumn", label: "秋林家园", note: "集市、诊所与兽栏落叶季", image: "assets/world/world-map-autumn.webp", mobileImage: "assets/world/world-map-autumn-mobile.webp", alt: "秋季动物家园全局地图", positions: { market: [17, 69], lakeside: [73, 66], meadow: [73, 25], clinic: [37, 18], rescue: [24, 16], training: [73, 47], highlands: [94, 10], home: [49, 45], forest: [88, 15], saltmarsh: [86, 75], greenhouse: [60, 28] } },
  { id: "winter", label: "冬季雪谷", note: "结冰水面与雪线巡护路线", image: "assets/world/world-map-winter.webp", mobileImage: "assets/world/world-map-winter-mobile.webp", alt: "冬季雪谷动物保育区全局地图", positions: { market: [31, 45], lakeside: [46, 72], meadow: [79, 29], clinic: [39, 29], rescue: [26, 27], training: [72, 64], highlands: [13, 15], home: [49, 34], forest: [91, 19], saltmarsh: [80, 70], greenhouse: [59, 39] } },
  { id: "night", label: "星灯夜图", note: "夜间巡护灯线与湿地倒影", image: "assets/world/world-map-night.webp", mobileImage: "assets/world/world-map-night-mobile.webp", alt: "星灯夜间动物家园全局地图", positions: { market: [31, 42], lakeside: [83, 78], meadow: [75, 30], clinic: [63, 43], rescue: [80, 29], training: [37, 52], highlands: [17, 15], home: [50, 44], forest: [91, 32], saltmarsh: [63, 67], greenhouse: [58, 35] } }
];

const MAP_SCENE_EVENTS = {
  spring: { location: "meadow", label: "晨间巡护", title: "谷口薄雾散开", summary: "草甸饮水点刚被补满，几只小动物沿着浅径回到林缘。" },
  summer: { location: "saltmarsh", label: "潮汐警讯", title: "潮水提前回涨", summary: "潮沟水位比预报快了一刻钟，鸟岛木栈道需要先确认安全。" },
  autumn: { location: "market", label: "落叶季事件", title: "集市开始收秋货", summary: "溪桥集市铺开了秋果和保温垫，诊所正在登记换季照管需求。" },
  winter: { location: "highlands", label: "雪线巡护", title: "雪脊出现新足迹", summary: "瞭望台下发现一串新鲜足迹，通往结冰溪谷的路线需要重新标记。" },
  night: { location: "greenhouse", label: "夜间观察", title: "温室灯影换位", summary: "夜行伙伴沿着玻璃穹顶移动，值夜员把低亮度观察灯调到东侧。" }
};

const CALENDAR_DAYS = 28;
const WEEKDAY_NAMES = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const SEASON_NAMES = ["春季", "夏季", "秋季", "冬季"];
const CALENDAR_FESTIVALS = {
  7: { title: "春野领养开放日", note: "救助站与草甸共同开放领养见面活动。", time: "10:00", location: "rescue", kind: "节庆" },
  14: { title: "芦湾自然观察日", note: "沿湖记录水鸟、足迹与动物活动情况。", time: "08:30", location: "lakeside", kind: "节庆" },
  21: { title: "伙伴默契运动会", note: "为家园伙伴准备低压力训练和游戏。", time: "14:00", location: "training", kind: "节庆" },
  28: { title: "月末家园分享会", note: "结算本月照管成果，和伙伴安静度过夜晚。", time: "18:00", location: "home", kind: "里程碑" }
};

const EVENT_TEMPLATES = [
  { id: "home-breakfast", repeat: true, location: "home", window: [420, 600], title: "早餐时间", summary: "家里的伙伴已经守在食盆旁边。", detail: "准备三份合适的食物，让今天留在家里的动物先吃饱。", game: "drag", pet: "active", cost: { food: 1 }, reward: { trust: 4, mood: 5, reputation: 1 }, label: "日常" },
  { id: "rescue-rabbit", location: "rescue", window: [450, 720], title: "纸箱里的细小鼻音", summary: "救助站门口留下了一只紧张的垂耳兔。", detail: "先找出纸箱周围可能伤到它的异物，再让它安静下来。完成救助后，团子会进入待领养名单。", game: "inspect", pet: "rabbit", reward: { coins: 24, reputation: 5, candidate: "rabbit" }, label: "救助", unavailable: () => hasPetOrCandidate("rabbit") },
  { id: "rescue-cockatiel", location: "rescue", window: [810, 1050], title: "窗台边的黄色冠羽", summary: "一只受惊的玄凤鹦鹉停在救助站内侧，不敢离开栖木。", detail: "让已有的虎皮鹦鹉在安全距离陪伴，再移开会惊扰它的物品。完成安置后，米粒会进入待领养名单。", game: "inspect", pet: "cockatiel", requiredPets: ["budgie"], reward: { coins: 32, reputation: 7, candidate: "cockatiel" }, label: "救助", unavailable: () => hasPetOrCandidate("cockatiel") },
  { id: "market-delivery", repeat: true, location: "market", window: [600, 900], title: "集市补给到货", summary: "新鲜饲料和护理物资已经摆上摊位。", detail: "帮摊主检查装货绳结，可以领取一份食物作为报酬。", game: "inspect", pet: "active", reward: { food: 2, coins: 12 }, label: "委托" },
  { id: "meadow-cat", location: "meadow", window: [660, 960], title: "草丛里有一双眼睛", summary: "一只长毛猫躲在草甸边，不肯走近。", detail: "把食物放到它愿意接近的位置，不要突然靠得太近。完成后，芝麻会到救助站等待领养。", game: "drag", pet: "cat", cost: { food: 1 }, reward: { coins: 30, reputation: 7, candidate: "cat" }, label: "发现", unavailable: () => hasPetOrCandidate("cat") },
  { id: "clinic-checkup", repeat: true, location: "clinic", window: [780, 1050], title: "例行健康检查", summary: "诊所需要一位熟悉动物的帮手。", detail: "找出三个需要记录的位置，协助完成今天的检查。", game: "inspect", pet: "active", reward: { coins: 28, reputation: 4, medicine: 1 }, label: "照管" },
  { id: "meadow-fetch", repeat: true, location: "meadow", window: [900, 1110], title: "草甸追球赛", summary: "散步的动物们在等一个会投球的伙伴。", detail: "把球依次送到三个目标，让当前伙伴完成一轮追逐。", game: "play", pet: "active", reward: { coins: 18, trust: 5, mood: 8 }, label: "活动" },
  { id: "forest-fox", location: "forest", window: [990, 1260], title: "溪边留下的脚印", summary: "巡护员在森林溪边发现了幼狐活动的痕迹。", detail: "清理遮挡视线的水泡和湿叶，确认幼狐的位置。完成救助后，栗子会进入待领养名单。", game: "bubbles", pet: "fox", reward: { coins: 42, reputation: 10, candidate: "fox" }, label: "巡护", unavailable: () => hasPetOrCandidate("fox") },
  { id: "lakeside-boardwalk", repeat: true, location: "lakeside", window: [510, 720], title: "木栈道晨间巡查", summary: "昨夜的风把水草和杂物带到了浅湾。", detail: "沿着湖边确认三个需要清理的位置，保证木栈道和饮水点安全。", game: "inspect", pet: "active", reward: { coins: 22, reputation: 3, clean: 5 }, label: "巡查" },
  { id: "training-course", repeat: true, location: "training", window: [720, 990], title: "默契障碍练习", summary: "训练场已经布置好今天的基础路线。", detail: "把球依次送到训练标记，让伙伴完成一轮有节奏的追逐练习。", game: "play", pet: "active", reward: { coins: 24, trust: 7, mood: 9, growth: 6 }, label: "训练" },
  { id: "highlands-patrol", repeat: true, location: "highlands", window: [960, 1200], title: "高地观测记录", summary: "远处山脊的风向发生了变化。", detail: "确认瞭望台周围的三个观测位置，把山谷天气变化记录下来。", game: "inspect", inspectMode: "watch", pet: "active", reward: { coins: 36, reputation: 5, growth: 5 }, label: "远行" },
  { id: "home-evening", repeat: true, location: "home", window: [1080, 1290], title: "晚间梳理", summary: "玩了一天，毛发里带回了草叶和灰尘。", detail: "顺着毛发仔细梳理，让伙伴干干净净地休息。", game: "stroke", pet: "active", reward: { trust: 5, clean: 14, reputation: 1 }, label: "日常" }
];

const RANDOM_EVENT_TEMPLATES = [
  { id: "chance-supply-crate", repeat: true, location: "market", window: [480, 660], title: "没有署名的补给箱", summary: "集市门边多了一只没有登记的木箱。", detail: "检查封条和角落，确认物资来源后协助摊主完成入库。", game: "inspect", pet: "active", reward: { coins: 16, food: 1 }, label: "偶遇" },
  { id: "chance-rescue-blanket", repeat: true, location: "rescue", window: [630, 810], title: "晾绳上的毛毯", summary: "一阵风把救助站的护理毛毯吹散了。", detail: "找出落在院子里的三处毛毯和夹子，赶在下一批动物到来前收好。", game: "inspect", pet: "active", reward: { coins: 14, reputation: 2 }, label: "突发" },
  { id: "chance-home-visitor", repeat: true, location: "home", window: [840, 1020], title: "篱笆外的访客", summary: "一只胆小的野鸟停在饮水盆附近。", detail: "保持安静，清理遮挡视线的位置，让伙伴学会不过度追逐访客。", game: "bubbles", pet: "active", reward: { trust: 4, mood: 6, reputation: 1 }, label: "偶遇" },
  { id: "chance-lake-basket", repeat: true, location: "lakeside", window: [600, 780], title: "漂到芦苇边的篮子", summary: "浅湾里卡着一只被水浸湿的旧篮子。", detail: "清理水面遮挡并确认篮子里没有受困的小动物。", game: "bubbles", pet: "active", reward: { coins: 20, reputation: 3, soap: 1 }, label: "发现" },
  { id: "chance-meadow-picnic", repeat: true, location: "meadow", window: [780, 960], title: "草地上的遗落点心", summary: "散步道旁留下了不适合动物食用的食物。", detail: "检查草地上的三个位置，把可能误食的东西全部收走。", game: "inspect", pet: "active", reward: { coins: 18, health: 4, reputation: 2 }, label: "突发" },
  { id: "chance-clinic-delivery", repeat: true, location: "clinic", window: [930, 1080], title: "护理车临时到站", summary: "一批需要低温保存的护理用品提前送达。", detail: "核对三个存放位置，协助诊所快速完成物资交接。", game: "inspect", pet: "active", reward: { medicine: 1, coins: 22, reputation: 2 }, label: "委托" },
  { id: "chance-training-bell", repeat: true, location: "training", window: [900, 1080], title: "第一次听见训练铃", summary: "伙伴对场边的新铃声既好奇又谨慎。", detail: "用一轮轻松追球建立正向联系，让它逐渐适应训练场的声音。", game: "play", pet: "active", reward: { treat: 1, trust: 6, growth: 7 }, label: "机会" },
  { id: "chance-forest-branch", repeat: true, location: "forest", window: [1050, 1230], title: "巡护路上的断枝", summary: "风把一截枯枝吹到了常用巡护路线上。", detail: "清理遮挡并检查周围，确保夜间巡护不会被绊住。", game: "bubbles", pet: "active", reward: { coins: 26, reputation: 3, clean: 5 }, label: "突发" },
  { id: "chance-highland-tracks", repeat: true, location: "highlands", window: [1080, 1260], title: "瞭望台旁的新脚印", summary: "高地泥土上出现了一串陌生足迹。", detail: "记录三个关键位置，判断它们通往山谷还是更高的山脊。", game: "inspect", pet: "active", reward: { coins: 34, reputation: 4, growth: 6 }, label: "发现" },
  { id: "chance-home-meter", repeat: true, location: "home", window: [450, 600], title: "门缝里的温度计", summary: "晨风让门厅温度比室内低了几度。", detail: "记住温度计、门垫和窗缝的顺序，把保暖措施安排到位。", game: "memory", pet: "active", reward: { comfort: 5, health: 2, reputation: 1 }, label: "日常" },
  { id: "chance-rescue-tag", repeat: true, location: "rescue", window: [720, 900], title: "编号牌被雨水打乱", summary: "隔离区的编号牌被风吹到了不同围栏。", detail: "按动物体型和安置记录重新排序，避免把新来的伙伴放错区域。", game: "sort", pet: "active", reward: { reputation: 4, coins: 18, trust: 2 }, label: "突发" },
  { id: "chance-market-weighing", repeat: true, location: "market", window: [900, 1080], title: "称重台的微小偏差", summary: "一只粮袋的重量和货单差了半格。", detail: "在三次指针稳定时读数，确认补给数量再完成交接。", game: "timing", pet: "active", reward: { coins: 24, food: 2, reputation: 2 }, label: "委托" },
  { id: "chance-clinic-quiet-room", repeat: true, location: "clinic", window: [600, 750], title: "候诊室的安静角落", summary: "一只敏感的小动物需要避开走廊脚步声。", detail: "选择合适的遮挡、距离和照明，让它在不受惊的情况下完成转移。", game: "choice", pet: "active", reward: { comfort: 6, stress: -8, reputation: 3 }, label: "照管" },
  { id: "chance-meadow-seedling", repeat: true, location: "meadow", window: [480, 630], title: "被踩倒的幼苗", summary: "晨露里有几株刚种下的草本幼苗倒在路径边。", detail: "沿着木桩路线绕开湿地，把三株幼苗扶回固定圈。", game: "trail", pet: "active", reward: { reputation: 3, growth: 5, mood: 3 }, label: "维护" },
  { id: "chance-lake-otter", repeat: true, location: "lakeside", window: [840, 1020], title: "浮桥下的水獭", summary: "水獭把一串浮漂拖到了栈桥下面。", detail: "在水面波纹合适的时机收回浮漂，别惊动正在休息的水獭。", game: "pounce", pet: "active", reward: { trust: 5, reputation: 3, mood: 4 }, label: "发现" },
  { id: "chance-forest-cache", repeat: true, location: "forest", window: [720, 900], title: "树根下的储藏点", summary: "巡护路旁发现了被松针盖住的旧储粮罐。", detail: "记住树根、溪石和路标的位置，再按顺序取出可用物资。", game: "memory", pet: "active", reward: { food: 2, coins: 20, growth: 4 }, label: "发现" },
  { id: "chance-training-weather-vane", repeat: true, location: "training", window: [540, 690], title: "风向标卡住了", summary: "训练场的风向标停在了错误的方向。", detail: "观察三次风向变化，在指针稳定时完成校准。", game: "timing", pet: "active", reward: { growth: 6, trust: 3, reputation: 2 }, label: "维护" },
  { id: "chance-highland-radio", repeat: true, location: "highlands", window: [600, 780], title: "山脊传来的短讯", summary: "远端巡护员发来一段断续的无线电报码。", detail: "把三个信号片段按听到的顺序配对，确认山谷没有异常。", game: "match3", pet: "active", reward: { reputation: 5, growth: 5, coins: 28 }, label: "巡护" }
];

EVENT_TEMPLATES.push(
  { id: "saltmarsh-tide-report", repeat: true, location: "saltmarsh", window: [480, 690], title: "第一道潮线", summary: "潮水比预报提前抵达了盐沼外缘。", detail: "沿潮位尺记录水线、鸟巢箱和栈桥三处变化，决定今天是否开放浅滩路线。", game: "sort", pet: "active", reward: { reputation: 7, growth: 8, coins: 34 }, label: "保育" },
  { id: "greenhouse-night-pollinators", repeat: true, location: "greenhouse", window: [1110, 1260], title: "星灯下的访客", summary: "夜花开放后，一批传粉昆虫绕着穹顶灯飞来。", detail: "保持灯光距离和通风口的平衡，让夜行访客完成授粉后安全离开。", game: "choice", pet: "active", reward: { growth: 10, reputation: 6, mood: 4 }, label: "生态" }
);

RANDOM_EVENT_TEMPLATES.push(
  { id: "chance-saltmarsh-stranded-seal", repeat: true, location: "saltmarsh", window: [720, 900], title: "泥滩上的小海豹", summary: "退潮后，一只幼海豹停在远离深水的泥滩边。", detail: "先判断潮线和安全距离，再把围观路线调整到不会惊扰它的位置。", game: "pounce", pet: "active", reward: { reputation: 8, trust: 5, coins: 30 }, label: "救援" },
  { id: "chance-saltmarsh-tagged-bird", repeat: true, location: "saltmarsh", window: [930, 1080], title: "脚环号码回传", summary: "一只候鸟的脚环号码在观测镜里短暂出现。", detail: "按羽色、方向和停留时间配对记录，确认它来自哪条迁徙路线。", game: "memory", pet: "active", reward: { reputation: 6, growth: 7, coins: 26 }, label: "发现" },
  { id: "chance-greenhouse-pipe-leak", repeat: true, location: "greenhouse", window: [540, 720], title: "集水管轻微渗漏", summary: "晨光下，温室一角的集水管滴水速度变快了。", detail: "按水滴节奏找到渗漏点，先放置接水盘再关闭对应阀门。", game: "timing", pet: "active", reward: { clean: 6, coins: 22, reputation: 3 }, label: "维护" },
  { id: "chance-greenhouse-bat-route", repeat: true, location: "greenhouse", window: [1020, 1170], title: "蝙蝠的回巢路线", summary: "一只夜行伙伴绕开了原来的栖息架。", detail: "观察它的飞行高度和回声方向，把三处遮挡物移到不会改变路线的位置。", game: "flight", pet: "active", reward: { trust: 7, growth: 8, reputation: 4 }, label: "观察" }
);

const WEATHER_EVENT_TEMPLATES = [
  { id: "weather-fog-saltmarsh", repeat: true, weather: "fog", location: "saltmarsh", window: [540, 720], title: "雾里的潮沟", summary: "晨雾压低了盐沼能见度，木桩标记只剩轮廓。", detail: "用三处近岸标记确认栈桥方向，避免把伙伴带进软泥区。", game: "trail", pet: "active", reward: { trust: 4, reputation: 5, growth: 5 }, label: "天气" },
  { id: "weather-rain-greenhouse", repeat: true, weather: "rain", location: "greenhouse", window: [780, 960], title: "雨幕下的玻璃穹顶", summary: "雨水敲在穹顶上，温室里的夜行伙伴开始提前休息。", detail: "调整三处遮光帘和集水桶，保持栖息层安静、干燥和有序。", game: "sort", pet: "active", reward: { comfort: 6, clean: 5, reputation: 4 }, label: "天气" },
  { id: "weather-clear-meadow", repeat: true, weather: "clear", location: "meadow", window: [720, 870], title: "晴日长草赛跑", summary: "阳光把草地晒得温暖，正适合短距离运动。", detail: "完成一轮追球，让伙伴在最舒适的天气里充分活动。", game: "play", pet: "active", reward: { mood: 7, energy: 3, growth: 4 }, label: "天气" },
  { id: "weather-partly-lake", repeat: true, weather: "partlyCloudy", location: "lakeside", window: [690, 900], title: "云隙里的水鸟记录", summary: "云影在湖面缓慢移动，浅湾的水鸟开始靠岸。", detail: "沿栈道安静观察，记录三处短暂出现的活动迹象。", game: "inspect", inspectMode: "watch", pet: "active", reward: { mood: 5, growth: 5, reputation: 2 }, label: "天气" },
  { id: "weather-cloudy-clinic", repeat: true, weather: "cloudy", location: "clinic", window: [780, 960], title: "阴天安静门诊", summary: "凉爽的空气让今天的候诊动物格外平静。", detail: "确认三个观察位置，协助完成一轮低压力健康记录。", game: "inspect", pet: "active", reward: { health: 6, medicine: 1, reputation: 2 }, label: "天气" },
  { id: "weather-drizzle-home", repeat: true, weather: "drizzle", location: "home", window: [540, 720], title: "窗边防滑整理", summary: "细雨落在窗外，入口垫布留下了几处潮湿脚印。", detail: "留在室内擦干入口并整理垫布，让小型伙伴走动时不会打滑。", game: "bubbles", pet: "active", reward: { clean: 7, coins: 12, reputation: 1 }, label: "天气" },
  { id: "weather-rain-home", repeat: true, weather: "rain", location: "home", window: [540, 750], title: "室内避雨整理", summary: "稳定的中雨让所有伙伴都回到了室内，入口附近需要保持干燥。", detail: "记住干燥寝具的摆放顺序，再把湿叶和水迹转移到指定区域。", game: "memory", pet: "active", reward: { clean: 9, coins: 16, reputation: 2 }, label: "天气" },
  { id: "weather-heavy-rescue", repeat: true, weather: "heavyRain", location: "rescue", window: [600, 900], title: "大雨临时安置", summary: "户外区域关闭，救助站正在加固窗边和转移寝具。", detail: "检查三处室内安置点，把受潮物品换到干燥区域。", game: "inspect", pet: "active", reward: { medicine: 1, coins: 24, reputation: 3, comfort: 5 }, label: "天气" },
  { id: "weather-storm-home", repeat: true, weather: "thunderstorm", location: "home", window: [660, 990], title: "雷暴安抚时段", summary: "雷声靠近山谷，所有伙伴都已留在安全建筑内。", detail: "找出室内三处声响来源并逐一固定，再陪敏感伙伴安静下来。", game: "inspect", inspectMode: "listening", pet: "active", reward: { mood: 7, trust: 5, stress: -10, reputation: 3 }, label: "天气" },
  { id: "weather-fog-forest", repeat: true, weather: "fog", location: "forest", window: [900, 1080], title: "薄雾里的路标", summary: "林间能见度下降，常走的小路变得模糊。", detail: "找出三个巡护标记，重新确认回到山谷的安全路线。", game: "inspect", pet: "active", reward: { coins: 28, reputation: 4, trust: 3 }, label: "天气" },
  { id: "weather-wind-market", repeat: true, weather: "wind", location: "market", window: [720, 960], title: "集市防风整理", summary: "持续阵风正在拉扯摊位边的遮雨布。", detail: "检查三个固定位置，把轻小物资收进有盖木箱。", game: "inspect", pet: "active", reward: { coins: 26, reputation: 3, growth: 3 }, label: "天气" },
  { id: "weather-cold-clinic", repeat: true, weather: "coldSnap", location: "clinic", window: [780, 1020], title: "降温健康巡诊", summary: "清晨突然降温，小型动物和鸟类需要额外保暖。", detail: "核对保温垫、饮水和室内栖木，完成一轮低温护理。", game: "inspect", pet: "active", reward: { health: 7, bedding: 1, reputation: 3 }, label: "天气" }
];

const LOCATION_ACTIVITIES = {
  rescue: [
    { id: "rescue-sort", label: "整理护理物资", note: "检查今日入库的急救用品", game: "inspect", reward: { coins: 10, reputation: 1 } }
  ],
  market: [
    { id: "market-errand", label: "协助摊位盘点", note: "核对容易遗漏的三个位置", game: "inspect", reward: { coins: 14, food: 1 } },
    { id: "market-hamster-store", label: "地道寻粮", note: "穿过地道绕开堵塞，收集三颗籽粮", game: "burrow", requiredPets: ["hamster"], reward: { food: 1, trust: 5, growth: 6 } }
  ],
  clinic: [
    { id: "clinic-records", label: "基础健康记录", note: "完成一次日常观察", game: "inspect", reward: { health: 5, reputation: 1 } },
    { id: "clinic-sanitize", label: "清理检查区域", note: "维持诊疗环境整洁", game: "bubbles", reward: { clean: 7, medicine: 1 } }
  ],
  meadow: [
    { id: "meadow-trail", label: "草甸嗅闻散步", note: "沿着气味路线探索", game: "inspect", inspectMode: "scent", requiredPets: ["dog", "cat", "rabbit", "hamster", "poodle", "fox"], reward: { mood: 7, trust: 3 } },
    { id: "meadow-carrot", label: "菜圃拔萝卜", note: "跟着节奏帮团子收获萝卜", game: "carrot", requiredPets: ["rabbit"], reward: { carrot: 2, mood: 9, growth: 6 } },
    { id: "meadow-fetch", label: "开阔地特色玩耍", note: "消耗 1 件玩具", game: "play", cost: { toy: 1 }, reward: { mood: 11, growth: 4 } },
    { id: "meadow-bird-flight", label: "低空召回练习", note: "引导鸟类依次穿过三道召回环", game: "flight", requiredPets: ["budgie", "cockatiel"], weatherSensitive: "birdFlight", reward: { mood: 12, trust: 6, growth: 8, stress: -4 } }
  ],
  lakeside: [
    { id: "lakeside-clean", label: "浅湾漂浮物清理", note: "维护水边活动区域", game: "bubbles", reward: { clean: 8, reputation: 1 } },
    { id: "lakeside-watch", label: "栈道安静观察", note: "记录湿地的三个动静", game: "inspect", inspectMode: "watch", reward: { trust: 4, growth: 4 } },
    { id: "lakeside-fishing", label: "芦湾钓鱼", note: "等浮漂下沉时及时收杆", game: "fishing", requiredPets: ["cat"], reward: { fish: 2, trust: 6, growth: 7 } }
  ],
  forest: [
    { id: "forest-patrol", label: "林间气味巡护", note: "检查常用的安全路线", game: "inspect", inspectMode: "scent", requiredPets: ["dog", "cat", "rabbit", "hamster", "poodle", "fox"], reward: { trust: 5, reputation: 2 } },
    { id: "forest-canopy-watch", label: "林冠巡查", note: "引导鸟类观察三处树冠动静", game: "inspect", inspectMode: "watch", requiredPets: ["budgie", "cockatiel"], reward: { trust: 5, reputation: 2, growth: 5 } },
    { id: "forest-stream", label: "溪边障碍清理", note: "移开水边遮挡物", game: "bubbles", reward: { clean: 7, coins: 16 } }
  ],
  training: [
    { id: "training-fetch", label: "特色投掷召回", note: "看准力度，让伙伴追回专属道具", game: "throw", requiredPets: ["dog", "poodle"], cost: { treat: 1 }, reward: { trust: 7, growth: 7 } },
    { id: "training-focus", label: "环境专注训练", note: "确认三个声音来源", game: "inspect", inspectMode: "listening", reward: { mood: 6, growth: 6 } }
  ],
  highlands: [
    { id: "highlands-markers", label: "高地路径确认", note: "检查瞭望路线标记", game: "inspect", reward: { coins: 20, reputation: 2 } },
    { id: "highlands-supplies", label: "远行装备检查", note: "整理受潮和松动的物资", game: "bubbles", reward: { medicine: 1, growth: 5 } }
  ],
  saltmarsh: [
    { id: "saltmarsh-tide-gate", label: "潮闸放水记录", note: "在潮位稳定时记录三次水位", game: "timing", reward: { reputation: 4, growth: 7 } },
    { id: "saltmarsh-egret-watch", label: "白鹭巢区观察", note: "沿木栈道记录不惊扰巢区的动静", game: "inspect", inspectMode: "watch", reward: { trust: 5, reputation: 3 } }
  ],
  greenhouse: [
    { id: "greenhouse-groom", label: "夜间栖木护理", note: "按栖木纹理完成一轮温和护理", game: "stroke", reward: { clean: 5, comfort: 5, health: 2 } },
    { id: "greenhouse-lamp-cycle", label: "补光灯节律", note: "在三次亮灯窗口内调整遮光帘", game: "timing", reward: { growth: 8, reputation: 3 } }
  ]
};

const EXPLORATION_GAMES = {
  home: [
    { id: "home-peekaboo", label: "窗边躲猫猫", note: "在家具后找出伙伴的影子", game: "bubbles", icon: "icon-paw", focus: "left", reward: { mood: 3, trust: 1 } },
    { id: "home-treasure", label: "玩具寻宝", note: "把玩具依次送回玩具篮", game: "play", icon: "icon-note", focus: "center", reward: { mood: 3, growth: 1 } },
    { id: "home-quiet-listen", label: "雨声猜猜看", note: "听清声音方向再做回应", game: "inspect", inspectMode: "listening", icon: "care-wash", focus: "right", reward: { comfort: 3, trust: 1 } }
  ],
  rescue: [
    { id: "rescue-blanket-fold", label: "毛毯接力", note: "把飘落的毛毯拖回安置篮", game: "drag", icon: "icon-heart", focus: "left", reward: { trust: 2, comfort: 2 } },
    { id: "rescue-quiet-corner", label: "安静角落", note: "用观察镜找到不惊扰小动物的安全位置", game: "inspect", inspectMode: "scan", icon: "icon-note", focus: "center", reward: { comfort: 3, stress: -2 } },
    { id: "rescue-care-scan", label: "护理梳理", note: "按正确方向整理护理毛发", game: "stroke", icon: "care-clean", focus: "right", reward: { health: 2, growth: 1 } }
  ],
  market: [
    { id: "market-crate-sort", label: "木箱分类", note: "先选物资，再把它送进正确类别的木箱", game: "sort", icon: "icon-coin", focus: "left", reward: { trust: 2, growth: 1 } },
    { id: "market-bell-run", label: "铃声送货", note: "跟着铃声把补给送到三个摊位", game: "flight", icon: "icon-note", focus: "center", reward: { mood: 2, coins: 2 } },
    { id: "market-rope-knot", label: "绳结挑战", note: "在节奏点收紧三处装货绳结", game: "pounce", icon: "icon-paw", focus: "right", reward: { growth: 2, trust: 1 } }
  ],
  meadow: [
    { id: "meadow-wind-dash", label: "追风短跑", note: "踩准节奏追上三片飘落的叶子", game: "play", icon: "upgrade-plant", focus: "left", reward: { mood: 4, energy: 1 } },
    { id: "meadow-scent-hunt", label: "草丛寻味", note: "沿气味路线找到隐藏的奖励", game: "inspect", inspectMode: "scent", icon: "care-snack", focus: "center", reward: { trust: 3, growth: 1 } },
    { id: "meadow-ring-hop", label: "花环跳跃", note: "引导伙伴穿过三道花环", game: "flight", icon: "upgrade-plant", focus: "right", reward: { mood: 4, growth: 2 } }
  ],
  lakeside: [
    { id: "lakeside-ripple-watch", label: "水纹快照", note: "在水纹消失前及时点下三次记录", game: "pounce", icon: "care-wash", focus: "left", reward: { trust: 2, growth: 1 } },
    { id: "lakeside-float-catch", label: "浮漂快收", note: "看准浮漂进入黄色窗口的瞬间收杆", game: "timing", icon: "care-wash", focus: "center", reward: { mood: 3, trust: 1 } },
    { id: "lakeside-reed-clean", label: "芦苇捞取", note: "捞出三件漂到岸边的杂物", game: "bubbles", icon: "upgrade-plant", focus: "right", reward: { clean: 3, reputation: 1 } }
  ],
  forest: [
    { id: "forest-track", label: "林间追踪", note: "顺着脚印规划安全路线", game: "trail", icon: "upgrade-plant", focus: "left", reward: { trust: 3, growth: 1 } },
    { id: "forest-pinecone", label: "松果回收", note: "控制力度把松果抛过小溪", game: "throw", icon: "icon-paw", focus: "center", reward: { mood: 3, growth: 2 } },
    { id: "forest-canopy", label: "树冠穿环", note: "引导伙伴穿过三道林间光环", game: "flight", icon: "icon-note", focus: "right", reward: { trust: 2, reputation: 1 } }
  ],
  training: [
    { id: "training-pounce", label: "伏击时机", note: "在亮区出现时完成三次扑击", game: "pounce", icon: "icon-paw", focus: "left", reward: { mood: 3, trust: 2 } },
    { id: "training-target", label: "目标追逐", note: "连续命中三个移动目标", game: "play", icon: "icon-paw", focus: "center", reward: { growth: 2, energy: 1 } },
    { id: "training-throw", label: "力度召回", note: "把专属道具投到安全区域", game: "throw", icon: "icon-note", focus: "right", reward: { trust: 3, growth: 1 } }
  ],
  highlands: [
    { id: "highlands-wind-read", label: "风向投递", note: "看准风向把信物投到瞭望筒", game: "throw", icon: "icon-note", focus: "left", reward: { growth: 2, trust: 1 } },
    { id: "highlands-flight", label: "云端穿环", note: "引导伙伴穿过高地召回环", game: "flight", icon: "icon-paw", focus: "center", reward: { mood: 3, growth: 2 } },
    { id: "highlands-listen", label: "山谷回声", note: "听清回声方向再回应", game: "inspect", inspectMode: "listening", icon: "icon-note", focus: "right", reward: { comfort: 3, stress: -1 } }
  ],
  clinic: [
    { id: "clinic-groom", label: "护理梳理", note: "顺着毛发生长方向完成护理", game: "stroke", icon: "care-brush", focus: "left", reward: { clean: 3, comfort: 2 } },
    { id: "clinic-check", label: "健康标记配对", note: "把相同的健康标记交换成三枚，完成一次检查记录", game: "match3", icon: "icon-cross", focus: "center", reward: { health: 3, growth: 1 } },
    { id: "clinic-listen", label: "听诊练习", note: "听清呼吸节奏再做记录", game: "inspect", inspectMode: "listening", icon: "icon-note", focus: "right", reward: { health: 2, trust: 1 } }
  ],
  saltmarsh: [
    { id: "saltmarsh-tide-map", label: "潮沟路线", note: "规划不会踩坏鸟巢的木栈道路线", game: "trail", icon: "care-wash", focus: "left", reward: { trust: 4, growth: 3 } },
    { id: "saltmarsh-reed-signal", label: "芦苇风向", note: "看准风向把标记旗插回潮沟边", game: "throw", icon: "icon-note", focus: "center", reward: { reputation: 3, growth: 4 } },
    { id: "saltmarsh-shell-count", label: "贝壳样本", note: "按潮线顺序配对三组样本", game: "match3", icon: "icon-cross", focus: "right", reward: { growth: 4, reputation: 2 } }
  ],
  greenhouse: [
    { id: "greenhouse-night-bloom", label: "夜花授粉", note: "在花粉飘落前完成三次引导", game: "pounce", icon: "upgrade-plant", focus: "left", reward: { growth: 6, mood: 4 } },
    { id: "greenhouse-roost-route", label: "栖息层换位", note: "让伙伴按高度顺序穿过三道栖木", game: "flight", icon: "icon-paw", focus: "center", reward: { trust: 5, growth: 5 } },
    { id: "greenhouse-lantern-code", label: "灯影密码", note: "记住灯影顺序再回应夜行伙伴", game: "memory", icon: "icon-note", focus: "right", reward: { comfort: 5, trust: 4 } }
  ]
};

const PET_GAME_LIBRARY = [
  { id: "shadow-memory", engine: "memory", mode: "影子记忆", scenes: ["home", "rescue"] },
  { id: "medical-match", engine: "match3", mode: "健康配对", scenes: ["clinic", "rescue", "market"] },
  { id: "ridge-route", engine: "trail", mode: "高地路线", scenes: ["highlands", "forest", "market"] },
  { id: "burrow-map", engine: "burrow", mode: "地道寻粮", scenes: ["home", "meadow", "market"] },
  { id: "scent-trail", engine: "inspect", inspectMode: "scent", mode: "气味追踪", scenes: ["meadow", "forest"] },
  { id: "echo-sequence", engine: "inspect", inspectMode: "listening", mode: "听声辨位", scenes: ["home", "clinic", "highlands"] },
  { id: "feather-pounce", engine: "pounce", mode: "伏击时机", scenes: ["meadow", "training", "lakeside"] },
  { id: "canopy-flight", engine: "flight", mode: "树冠穿环", scenes: ["meadow", "forest", "highlands"] },
  { id: "float-fishing", engine: "fishing", mode: "浮漂收杆", scenes: ["lakeside"] },
  { id: "carrot-rhythm", engine: "carrot", mode: "节奏采收", scenes: ["meadow"] },
  { id: "pinecone-throw", engine: "throw", mode: "力度投递", scenes: ["forest", "training", "highlands"] },
  { id: "grooming-line", engine: "stroke", mode: "顺毛梳理", scenes: ["home", "clinic", "rescue"] },
  { id: "wetland-net", engine: "bubbles", mode: "芦苇捞取", scenes: ["lakeside", "forest", "rescue"] },
  { id: "target-chase", engine: "play", mode: "目标追逐", scenes: ["home", "meadow", "training"] },
  { id: "signal-timing", engine: "timing", mode: "信号时机", scenes: ["market", "training", "highlands"] }
];
/**
 * 每位伙伴三种互不共用的玩法，铺满 11 个地点。任何机制只属于一位伙伴，
 * 避免换动物后仍看到同一套界面。
 */
const PET_GAME_LIBRARY_BY_PET = {
  dog: [
    { id: "dog-scent", engine: "inspect", inspectMode: "scent", mode: "气味追踪", scenes: ["meadow", "forest", "rescue", "saltmarsh"] },
    { id: "dog-fetch", engine: "play", mode: "目标追逐", scenes: ["home", "training", "lakeside"] },
    { id: "dog-route", engine: "trail", mode: "路线引导", scenes: ["market", "highlands", "clinic", "greenhouse"] }
  ],
  cat: [
    { id: "cat-pounce", engine: "pounce", mode: "伏击时机", scenes: ["home", "meadow", "training", "greenhouse"] },
    { id: "cat-fishing", engine: "fishing", mode: "浮漂收杆", scenes: ["lakeside", "forest", "saltmarsh"] },
    { id: "cat-memory", engine: "memory", mode: "影子记忆", scenes: ["rescue", "market", "clinic", "highlands"] }
  ],
  rabbit: [
    { id: "rabbit-rhythm", engine: "carrot", mode: "节奏采收", scenes: ["home", "meadow", "rescue"] },
    { id: "rabbit-forage", engine: "forage", mode: "草叶取舍", scenes: ["forest", "market", "clinic", "greenhouse"] },
    { id: "rabbit-choice", engine: "choice", mode: "草径抉择", scenes: ["highlands", "lakeside", "training", "saltmarsh"] }
  ],
  hamster: [
    { id: "hamster-burrow", engine: "burrow", mode: "地道寻粮", scenes: ["home", "meadow", "market"] },
    { id: "hamster-stash", engine: "stash", mode: "颊囊囤粮", scenes: ["rescue", "clinic", "greenhouse"] },
    { id: "hamster-store", engine: "match3", mode: "囤粮配对", scenes: ["forest", "training", "highlands", "lakeside", "saltmarsh"] }
  ],
  poodle: [
    { id: "poodle-groom", engine: "stroke", mode: "顺毛梳理", scenes: ["home", "clinic", "rescue"] },
    { id: "poodle-clean", engine: "bubbles", mode: "精细清理", scenes: ["lakeside", "forest", "meadow", "saltmarsh"] },
    { id: "poodle-timing", engine: "timing", mode: "仪态节奏", scenes: ["market", "training", "highlands", "greenhouse"] }
  ],
  fox: [
    { id: "fox-throw", engine: "throw", mode: "力度回收", scenes: ["forest", "training", "highlands"] },
    { id: "fox-trace", engine: "trace", mode: "足迹描摹", scenes: ["meadow", "rescue", "lakeside", "saltmarsh"] },
    { id: "fox-scan", engine: "inspect", inspectMode: "scan", mode: "痕迹侦查", scenes: ["home", "market", "clinic", "greenhouse"] }
  ],
  budgie: [
    { id: "budgie-flight", engine: "flight", mode: "低空飞行", scenes: ["meadow", "forest", "highlands", "greenhouse"] },
    { id: "budgie-watch", engine: "inspect", inspectMode: "watch", mode: "环境观察", scenes: ["home", "clinic", "lakeside", "saltmarsh"] },
    { id: "budgie-sort", engine: "sort", mode: "谷粒分拣", scenes: ["market", "training", "rescue"] }
  ],
  cockatiel: [
    { id: "cockatiel-listen", engine: "inspect", inspectMode: "listening", mode: "听声辨位", scenes: ["home", "clinic", "highlands", "saltmarsh"] },
    { id: "cockatiel-song", engine: "song", mode: "音阶跟唱", scenes: ["rescue", "market", "training", "greenhouse"] },
    { id: "cockatiel-perch", engine: "perch", mode: "栖木摆位", scenes: ["meadow", "forest", "lakeside"] }
  ]
};

function hashGameSeed(value) {
  return [...String(value)].reduce((hash, character) => ((hash * 33) ^ character.charCodeAt(0)) >>> 0, 5381);
}

function randomPetGame(petId, locationId, contextId = "") {
  const pool = (PET_GAME_LIBRARY_BY_PET[petId] || PET_GAME_LIBRARY).filter(game => game.scenes.includes(locationId));
  if (!pool.length) {
    const signature = resolvePetMiniGame("inspect", petId, "", locationId);
    return { id: `${petId}-signature`, engine: signature.game, inspectMode: signature.inspectMode, mode: miniGameModeLabel(signature.game, signature.inspectMode, petId) };
  }
  return pool[hashGameSeed(`${state.day}:${state.daily.care}:${petId}:${locationId}:${contextId}`) % pool.length];
}

function petGameLibrarySize(petId = "") { return petId ? (PET_GAME_LIBRARY_BY_PET[petId] || []).length : PET_GAME_LIBRARY.length; }

/**
 * 检查伙伴之间的玩法重叠：同一机制被几位伙伴使用、有没有两位伙伴的三件套完全相同。
 * 共享机制必须带有专属参数档案，否则只是换个名字的同一个游戏。
 */
function petGameOverlapAudit() {
  const usage = new Map();
  const combos = new Map();
  Object.entries(PET_GAME_LIBRARY_BY_PET).forEach(([petId, games]) => {
    const keys = games.map(game => `${game.engine}${game.inspectMode ? `:${game.inspectMode}` : ""}`);
    keys.forEach(key => usage.set(key, [...(usage.get(key) || []), petId]));
    const combo = [...keys].sort().join("+");
    combos.set(combo, [...(combos.get(combo) || []), petId]);
  });
  const shared = [...usage.entries()].filter(([, pets]) => pets.length > 1).map(([mechanic, pets]) => ({ mechanic, pets, profiled: PET_MECHANIC_PROFILED.includes(mechanic) }));
  return {
    mechanics: usage.size,
    maxPetsPerMechanic: Math.max(...[...usage.values()].map(pets => pets.length)),
    shared,
    unprofiledShared: shared.filter(entry => !entry.profiled).map(entry => entry.mechanic),
    duplicateSets: [...combos.entries()].filter(([, pets]) => pets.length > 1).map(([combo, pets]) => ({ combo, pets })),
    coverage: Object.entries(PET_GAME_LIBRARY_BY_PET).map(([petId, games]) => ({
      petId,
      locations: new Set(games.flatMap(game => game.scenes)).size
    }))
  };
}

/** 已不再共享机制；保留名单只给仍带专属参数档案的旧引擎。 */
const PET_MECHANIC_PROFILED = Object.freeze(["inspect:scent", "trail", "flight"]);

/** plays 是该玩法已完成次数的门槛；bonus 决定回合数，speed/window 决定节奏与判定宽度。 */
const MINI_DIFFICULTY_TIERS = [
  { id: "gentle", tier: 1, label: "轻松", note: "熟悉操作", plays: 0, bonus: 0, speed: .92, window: 1.22, reward: 1 },
  { id: "steady", tier: 2, label: "进阶", note: "回合更多", plays: 3, bonus: 1, speed: 1, window: 1, reward: 1.2 },
  { id: "skilled", tier: 3, label: "熟练", note: "节奏更快", plays: 7, bonus: 2, speed: 1.16, window: .84, reward: 1.45 },
  { id: "master", tier: 4, label: "大师", note: "判定更严", plays: 12, bonus: 3, speed: 1.32, window: .7, reward: 1.75 }
];

/** 由高到低排列：命中率与最高连击共同决定评级。 */
const MINI_RATINGS = [
  { id: "S", label: "完美默契", min: .97, reward: { trust: 3, growth: 4, mood: 2 } },
  { id: "A", label: "默契", min: .82, reward: { trust: 2, growth: 3 } },
  { id: "B", label: "耐心", min: .58, reward: { trust: 1, growth: 2 } },
  { id: "C", label: "坚持", min: 0, reward: { mood: 1, growth: 1 } }
];

const CONTRACT_TEMPLATES = [
  { id: "events", label: "山谷事务", note: "完成 2 个地图事件", target: 2, reward: { coins: 24 } },
  { id: "care", label: "细致照料", note: "完成 4 次照料或活动", target: 4, reward: { reputation: 2 } },
  { id: "locations", label: "巡访山谷", note: "到访 3 个不同地点", target: 3, reward: { coins: 18, treat: 1 } },
  { id: "coins", label: "稳健经营", note: "今日获得 35 金币", target: 35, reward: { food: 2 } },
  { id: "routine", label: "生活节奏", note: "完成 4 项生活日程", target: 4, reward: { reputation: 3 } },
  { id: "chance", label: "应对变化", note: "完成 1 个随机或天气事件", target: 1, reward: { coins: 20, soap: 1 } },
  { id: "companions", label: "伙伴轮换", note: "照料 2 位不同伙伴", target: 2, reward: { treat: 2 }, available: () => state.ownedPetIds.length >= 2 }
];

const ACHIEVEMENTS = [
  { id: "first-rescue", label: "伸出援手", note: "完成首个山谷事件", target: 1, metric: "events", reward: { coins: 20 } },
  { id: "explorer", label: "山谷行者", note: "到访 6 个不同地点", target: 6, metric: "locations", reward: { reputation: 4 } },
  { id: "caretaker", label: "可靠照管者", note: "累计完成 25 次照料", target: 25, metric: "care", reward: { coins: 45 } },
  { id: "chance-helper", label: "临场处置", note: "完成 5 个随机或天气事件", target: 5, metric: "randomEvents", reward: { reputation: 5 } },
  { id: "family", label: "热闹家园", note: "让 4 位伙伴入住", target: 4, metric: "owned", reward: { coins: 60 } },
  { id: "restful", label: "安稳长夜", note: "累计提供 12 小时睡眠", target: 720, metric: "sleepMinutes", reward: { bedding: 1 } },
  { id: "operator", label: "经营有方", note: "累计获得 500 金币", target: 500, metric: "earnedCoins", reward: { reputation: 8 } },
  { id: "streakkeeper", label: "守护成习惯", note: "完成 7 天照管连胜", target: 7, metric: "bestStreak", reward: { coins: 70 } }
];

const WEATHER = {
  clear: { label: "天气晴朗", note: "适合外出巡访", impact: "伙伴心情消耗稍慢", color: "#efbd42" },
  partlyCloudy: { label: "晴间多云", note: "云影偶尔掠过山谷", impact: "温度舒适，适合大多数活动", color: "#9fb6b2" },
  cloudy: { label: "云层渐厚", note: "凉爽，适合健康检查", impact: "精力消耗保持平稳", color: "#8fa4a0" },
  drizzle: { label: "持续小雨", note: "可以短时外出", impact: "毛发清洁与舒适轻微下降", color: "#7da5b3" },
  rain: { label: "稳定中雨", note: "外出需要缩短行程", impact: "清洁、舒适和精力消耗增加", color: "#5e879b" },
  heavyRain: { label: "持续大雨", note: "户外地点暂停开放", impact: "伙伴留在室内避雨", color: "#456c82" },
  thunderstorm: { label: "雷暴预警", note: "所有伙伴留在安全建筑内", impact: "敏感动物需要安抚并远离窗边", color: "#394d67" },
  fog: { label: "山谷薄雾", note: "巡护时留意路径", impact: "外出精力消耗稍高", color: "#aebdb6" },
  wind: { label: "持续大风", note: "鸟类停止户外飞行", impact: "高地关闭，其他行程缩短", color: "#7fa9ae" },
  coldSnap: { label: "清晨寒潮", note: "小型伙伴需要保暖", impact: "户外精力消耗显著增加", color: "#8aa4b4" }
};

const MARKET_STOCK = [
  { id: "food", name: "综合动物粮", note: "增加 3 份食物", icon: "care-snack", price: 18, amount: 3 },
  { id: "medicine", name: "基础护理包", note: "增加 2 份药品", icon: "care-clean", price: 26, amount: 2 },
  { id: "toy", name: "耐咬玩具", note: "增加 1 件玩具", icon: "icon-paw", price: 24, amount: 1 },
  { id: "treat", name: "训练零食", note: "增加 3 份零食", icon: "care-snack", price: 22, amount: 3 },
  { id: "soap", name: "温和清洁剂", note: "增加 2 份清洁用品", icon: "care-wash", price: 20, amount: 2 },
  { id: "bedding", name: "柔软寝具", note: "睡眠恢复效果更好", icon: "upgrade-cushion", price: 58, amount: 1, unique: true }
];

const FURNITURE_CATALOG = [
  { id: "starter-bed", name: "柳编睡床", note: "所有伙伴都能在这里安心休息", asset: "assets/props/starter-bed.webp", price: 0, compatible: PETS.map(pet => pet.id) },
  { id: "woven-rug", name: "编织地毯", note: "适合趴卧和晒太阳", asset: "assets/props/woven-rug.webp", price: 42, compatible: PETS.map(pet => pet.id) },
  { id: "cat-post", name: "猫抓柱", note: "让猫咪磨爪和伸展", asset: "assets/props/cat-post.webp", price: 68, compatible: ["cat"] },
  { id: "rabbit-tunnel", name: "兔子隧道", note: "垂耳兔可以钻行探索", asset: "assets/props/rabbit-tunnel.webp", price: 64, compatible: ["rabbit"] },
  { id: "toy-basket", name: "玩具篮", note: "伙伴会从中寻找自己的玩具", asset: "assets/props/toy-basket.webp", price: 56, compatible: PETS.map(pet => pet.id) }
];

const INVENTORY_ITEMS = {
  food: { label: "综合食物", note: "恢复 14 饱腹", icon: "care-snack", effect: { hunger: 14, energy: 2 }, action: "eat" },
  medicine: { label: "护理药品", note: "恢复 12 健康", icon: "care-clean", effect: { health: 12 }, action: "affection" },
  toy: { label: "互动玩具", note: "恢复 10 心情", icon: "icon-paw", effect: { mood: 10, energy: -4 }, action: "play" },
  treat: { label: "训练零食", note: "增加心情与信赖", icon: "care-snack", effect: { hunger: 5, mood: 8, trust: 2 }, action: "eat" },
  soap: { label: "清洁用品", note: "恢复 16 清洁", icon: "care-wash", effect: { clean: 16, health: 1 }, action: "affection" },
  bedding: { label: "柔软寝具", note: "持有时睡眠恢复增加", icon: "upgrade-cushion", persistent: true, action: "idle" },
  fish: { label: "芦湾鲜鱼", note: "猫咪专属鲜食，恢复 20 饱腹", icon: "care-snack", effect: { hunger: 20, mood: 4 }, action: "eat", pets: ["cat"] },
  carrot: { label: "新鲜萝卜", note: "兔子专属蔬菜，恢复 18 饱腹", icon: "care-snack", effect: { hunger: 18, mood: 3 }, action: "eat", pets: ["rabbit"] }
};

const HOME_ACTIONS = {
  feed: { label: "亲手喂食", note: "消耗 1 份食物", icon: "care-snack", game: "drag", cost: { food: 1 }, reward: { hunger: 18, trust: 2 } },
  brush: { label: "梳理毛发", note: "保持整洁", icon: "care-brush", game: "stroke", reward: { clean: 16, trust: 2 } },
  pet: { label: "轻轻抚摸", note: "安抚情绪", icon: "care-cuddle", game: "stroke", reward: { mood: 14, trust: 3 } },
  play: { label: "专属玩耍", note: "消耗 1 件玩具", icon: "icon-paw", game: "play", cost: { toy: 1 }, reward: { mood: 20, energy: -8, trust: 4 } },
  treat: { label: "训练与奖励", note: "消耗 1 份零食", icon: "care-snack", game: "drag", cost: { treat: 1 }, reward: { hunger: 6, mood: 10, trust: 5 } },
  bath: { label: "洗澡护理", note: "消耗 1 份清洁剂", icon: "care-wash", game: "bubbles", cost: { soap: 1 }, reward: { clean: 24, health: 2, trust: 2 } }
};

const PET_FOOD_ASSETS = {
  dog: "assets/props/dog-food.webp",
  poodle: "assets/props/dog-food.webp",
  cat: "assets/props/cat-food.webp",
  rabbit: "assets/props/rabbit-food.webp",
  hamster: "assets/props/hamster-food.webp",
  fox: "assets/props/fox-food.webp",
  budgie: "assets/props/bird-food.webp",
  cockatiel: "assets/props/bird-food.webp"
};

const INTERACTION_ASSETS = {
  ball: "assets/props/pet-ball.webp",
  hand: "assets/props/petting-hand.webp",
  brush: "assets/props/grooming-brush.webp",
  sponge: "assets/props/wash-sponge.webp"
};

const PET_PLAY_CONFIG = {
  dog: { label: "骨头", asset: "assets/props/dog-bone.webp" },
  poodle: { label: "训练环", asset: "assets/props/training-ring.webp" },
  cat: { label: "羽毛鱼", asset: "assets/props/cat-toy.webp" },
  rabbit: { label: "滚动萝卜", asset: "assets/props/rabbit-toy.webp" },
  hamster: { label: "籽粒球", asset: "assets/props/seed-ball.webp" },
  fox: { label: "松果", asset: "assets/props/pinecone-toy.webp" },
  budgie: { label: "木珠铃", asset: "assets/props/bird-toy.webp" },
  cockatiel: { label: "栖木玩具", asset: "assets/props/bird-toy.webp" }
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const petById = id => PETS.find(pet => pet.id === id);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const sanctuaryLevel = () => SANCTUARY_LEVELS.reduce((level, item) => (state.renown >= item.renown ? item.level : level), 1);
const sanctuaryLevelInfo = () => SANCTUARY_LEVELS[sanctuaryLevel() - 1];
const nextSanctuaryLevel = () => SANCTUARY_LEVELS.find(item => item.renown > state.renown);
const locationUnlocked = id => sanctuaryLevel() >= (LOCATIONS[id]?.level || 1);
const OUTDOOR_LOCATIONS = new Set(["meadow", "lakeside", "forest", "training", "highlands", "saltmarsh"]);
const SHELTER_LOCATIONS = new Set(["home", "rescue", "market", "clinic", "greenhouse"]);
const HOME_SHELTER_WEATHER = new Set(["drizzle", "rain", "heavyRain", "thunderstorm"]);
const RAIN_WEATHER = new Set(["drizzle", "rain", "heavyRain", "thunderstorm"]);

function homeUsesShelter(weatherId = state.weather) {
  return HOME_SHELTER_WEATHER.has(weatherId);
}

function locationPresentation(locationId, weatherId = state.weather) {
  const location = LOCATIONS[locationId];
  if (locationId === "home" && homeUsesShelter(weatherId)) {
    return {
      image: "assets/rooms/lounge.webp",
      kicker: "室内休息区",
      title: "动物家园 · 室内",
      hint: "窗外正在下雨，伙伴已回到温暖干燥的室内休息区",
      status: "正在室内避雨",
      sheltered: true
    };
  }
  return { image: location.image, kicker: location.kicker, title: location.name, hint: location.hint, status: "", sheltered: false };
}

function weatherBlockReason(locationId, weatherId = state.weather) {
  if (SHELTER_LOCATIONS.has(locationId) || !OUTDOOR_LOCATIONS.has(locationId)) return "";
  if (weatherId === "thunderstorm") return "雷暴预警，伙伴必须留在安全建筑内";
  if (weatherId === "heavyRain") return "持续大雨，户外活动暂停";
  if (weatherId === "wind" && locationId === "highlands") return "高地阵风过强，瞭望路线暂时关闭";
  if (weatherId === "fog" && locationId === "highlands") return "高地能见度过低，今天不开放远行";
  if (weatherId === "coldSnap" && locationId === "highlands") return "寒潮使高地道路结霜，今天不开放";
  return "";
}

function timeAdvanceAmount() {
  const unlocked = Object.keys(LOCATIONS).filter(locationUnlocked);
  const closed = unlocked.filter(locationId => weatherBlockReason(locationId)).length;
  return closed >= Math.max(2, Math.ceil(unlocked.length / 2)) ? 180 : 30;
}

function activityWeatherBlockedReason(activity, locationId = state.location, weatherId = state.weather) {
  const locationReason = weatherBlockReason(locationId, weatherId);
  if (locationReason) return locationReason;
  if (activity?.weatherSensitive === "birdFlight" && ["drizzle", "rain", "wind", "fog", "coldSnap"].includes(weatherId)) return "当前风雨或能见度不适合鸟类飞行";
  return "";
}

const els = {
  world: $("#worldView"), worldPanorama: $("#worldPanorama"), mapPanPrev: $("#mapPanPrev"), mapPanNext: $("#mapPanNext"), mapThemeButton: $("#mapThemeButton"), mapThemeLabel: $("#mapThemeLabel"), worldMap: $("#worldMap"), worldMapPrevious: $("#worldMapPrevious"), worldMapSource: $(".world-picture source"), worldMapPlane: $("#worldMapPlane"), mapSceneTransition: $("#mapSceneTransition"), mapSceneTransitionLabel: $("#mapSceneTransitionLabel"), mapExpansions: $("#worldExpansions"), location: $("#locationView"), mapLocations: $("#mapLocations"), eventTicker: $("#eventTicker"),
  locationArt: $("#locationArt"), locationDetails: $("#locationDetails"), locationPanel: $("#locationPanel"), locationKicker: $("#locationKicker"), locationTitle: $("#locationTitle"), locationStatus: $("#locationStatus"),
  petSprite: $("#petSprite"), companionSprite: $("#companionSprite"), speech: $("#speechBubble"), miniGame: $("#miniGame"), statusFloat: $("#statusFloat"), furnishings: $("#homeFurnishings"), sleepNest: $("#sleepNest"), sceneExplorer: $("#sceneExplorer"), sceneTrack: $("#sceneTrack"), sceneIndex: $("#sceneIndex"), scenePrev: $("#scenePrev"), sceneNext: $("#sceneNext"),
  roster: $("#petRoster"), capacity: $("#homeCapacity"), coins: $("#coins"), reputation: $("#reputation"), level: $("#sanctuaryLevel"), time: $("#timeLabel"), period: $("#periodLabel"), season: $("#seasonLabel"), sun: $("#sunIndicator"), advance: $("#advanceButton"), advanceHour: $("#advanceHourHand"), advanceMinute: $("#advanceMinuteHand"), timeTransition: $("#timeTransition"), timeHourHand: $("#timeHourHand"), timeMinuteHand: $("#timeMinuteHand"), timeTransitionLive: $("#timeTransitionLive"), timeTransitionFrom: $("#timeTransitionFrom"), timeTransitionTo: $("#timeTransitionTo"),
  sound: $("#soundButton"), inventory: $("#inventoryButton"), help: $("#helpButton"), journalBadge: $("#journalBadge"), inventoryDialog: $("#inventoryDialog"), inventoryGrid: $("#inventoryGrid"), inventoryDetail: $("#inventoryDetail"), routineSummary: $("#routineSummary"), backpackCount: $("#backpackCount"), backpackCapacity: $("#backpackCapacity"), timeProgress: $("#timeProgress"), rankTitle: $("#rankTitle"), rankProgressText: $("#rankProgressText"), rankProgress: $("#rankProgress"), careStreak: $("#careStreak"), journalContent: $("#journalContent"), sleepStatus: $("#sleepStatus"), sleepDuration: $("#sleepDuration"), helpDialog: $("#helpDialog"), calendar: $("#calendarButton"), calendarDialog: $("#calendarDialog"), calendarGrid: $("#calendarGrid"), calendarDetail: $("#calendarDetail"), calendarMonthLabel: $("#calendarMonthLabel"), calendarPrev: $("#calendarPrev"), calendarNext: $("#calendarNext"), calendarToday: $("#calendarToday"), saveStatus: $("#saveStatus"), saveStatusLabel: $("#saveStatusLabel"), onboardingTour: $("#onboardingTour"), onboardingTitle: $("#onboardingTitle"), onboardingText: $("#onboardingText"), onboardingProgress: $("#onboardingProgress"), onboardingStepLabel: $("#onboardingStepLabel"), onboardingZoneLabel: $("#onboardingZoneLabel"), onboardingDemoText: $("#onboardingDemoText"), onboardingPrev: $("#onboardingPrev"), onboardingNext: $("#onboardingNext"), onboardingSkip: $("#onboardingSkip"), onboardingReplay: $("#onboardingReplay"), tutorialFocus: $("#tutorialFocus"), tutorialHand: $("#tutorialHand"), tutorialClickRing: $("#tutorialClickRing"), tutorialCard: $("#tutorialCard"), worldAmbient: $("#worldAmbient"), locationAmbient: $("#locationAmbient"),   weatherTransition: $("#weatherTransition"), weatherTransitionScene: $("#weatherTransitionScene"), weatherFromLabel: $("#weatherFromLabel"), weatherToLabel: $("#weatherToLabel"), weatherTransitionNote: $("#weatherTransitionNote"), dayDialog: $("#dayDialog"), dayResults: $("#dayResults"), shareDay: $("#shareDayButton"), firstDayHook: $("#firstDayHook"), startMenu: $("#startMenu"), startBegin: $("#startBegin"), startContinue: $("#startContinue"), startReset: $("#startReset"), toast: $("#toastRegion"), dock: $("#petDock"), dockToggle: $("#dockToggle")
};

function defaultStats() { return { hunger: 76, clean: 72, mood: 80, energy: 82, health: 92, comfort: 84, stress: 10, trust: 8, growth: 0, ageDays: 1, interactions: 0, asleep: false, sleepMinutes: 0 }; }
function defaultRoutine(day = 1) { return { day, breakfast: false, outing: false, bond: false, clean: false, sleep: false, bonus: false }; }
function defaultDaily() { return { events: 0, coins: 0, reputation: 0, care: 0, activities: 0, randomEvents: 0, locations: [], pets: [] }; }
function defaultRecords() { return { events: 0, care: 0, randomEvents: 0, adoptions: 0, purchases: 0, earnedCoins: 0, sleepMinutes: 0, miniGames: 0, perfectGames: 0, bestCombo: 0, locations: {} }; }
function createDefaultState() {
  return {
    day: 1, minutes: 420, coins: 190, reputation: 5, renown: 5, weather: "clear", mapThemeId: "spring", view: "world", location: "home",
    ownedPetIds: ["dog"], candidates: [], activePetId: "dog", capacity: 2,
    inventory: { food: 5, medicine: 2, toy: 2, treat: 2, soap: 2, bedding: 1, fish: 0, carrot: 0 }, backpackCapacity: 24,
    furnitureOwned: ["starter-bed"], furniturePlaced: { "starter-bed": { x: 56, y: 78, scale: 1, rotation: 0, layer: 78 } }, homeMode: "life", selectedFurnitureId: "starter-bed", pendingFurnishId: null, furnitureUsedAt: {},
    petStats: { dog: defaultStats() }, petRoutines: { dog: defaultRoutine(1) }, completed: [], careStreak: 0, bestCareStreak: 0,
    selectedEventId: null, selectedInventoryId: "food", muted: false, audioVersion: 2, mapScrollRatio: 0, daily: defaultDaily(), records: defaultRecords(), miniMastery: {}, calendarHistory: {}, contractDay: 0, contractIds: [], claimedContracts: [], achievementsClaimed: [], randomEventDay: 0, randomEventIds: [], recentRandomEventIds: [], miniGameActive: false
  };
}

function loadState() {
  const base = createDefaultState();
  try {
    const saved = JSON.parse(localStorage.getItem("valleySanctuarySaveV1"));
    if (!saved) return base;
    const merged = { ...base, ...saved, inventory: { ...base.inventory, ...(saved.inventory || {}) }, furnitureOwned: [...new Set(["starter-bed", ...(saved.furnitureOwned || [])])], furniturePlaced: { ...base.furniturePlaced, ...(saved.furniturePlaced || {}) }, daily: { ...defaultDaily(), ...(saved.daily || {}) }, records: { ...defaultRecords(), ...(saved.records || {}), locations: { ...(saved.records?.locations || {}) } }, miniMastery: { ...(saved.miniMastery || {}) }, calendarHistory: { ...(saved.calendarHistory || {}) }, petRoutines: { ...(saved.petRoutines || {}) }, petStats: { ...base.petStats, ...(saved.petStats || {}) } };
    merged.ownedPetIds = merged.ownedPetIds.filter(id => petById(id));
    if (!merged.ownedPetIds.length) merged.ownedPetIds = ["dog"];
    if (!merged.ownedPetIds.includes(merged.activePetId)) merged.activePetId = merged.ownedPetIds[0];
    merged.ownedPetIds.forEach(id => {
      merged.petStats[id] = { ...defaultStats(), ...(merged.petStats[id] || {}) };
      const legacyRoutine = id === merged.activePetId ? saved.routine : null;
      const routine = { ...defaultRoutine(merged.day), ...(merged.petRoutines[id] || legacyRoutine || {}) };
      merged.petRoutines[id] = routine.day === merged.day ? routine : defaultRoutine(merged.day);
    });
    delete merged.routine;
    if (!Number.isFinite(saved.renown)) {
      const progressionEstimate = 5 + merged.completed.length * 2 + Math.max(0, merged.ownedPetIds.length - 1) * 5;
      merged.renown = Math.max(5, merged.reputation || 0, progressionEstimate, merged.ownedPetIds.includes("fox") ? 25 : 0);
    }
    if (!Array.isArray(merged.completed)) merged.completed = [];
    if (!Array.isArray(merged.randomEventIds)) merged.randomEventIds = [];
    if (!MAP_THEMES.some(theme => theme.id === merged.mapThemeId)) merged.mapThemeId = "spring";
    if (!Array.isArray(merged.recentRandomEventIds)) merged.recentRandomEventIds = [];
    normalizeFurnitureState(merged);
    if (!Array.isArray(merged.contractIds)) merged.contractIds = [];
    if (!Array.isArray(merged.claimedContracts)) merged.claimedContracts = [];
    if (!Array.isArray(merged.achievementsClaimed)) merged.achievementsClaimed = [];
    if (!Number.isFinite(merged.careStreak) || merged.careStreak < 0) merged.careStreak = 0;
    if (!Number.isFinite(merged.bestCareStreak) || merged.bestCareStreak < merged.careStreak) merged.bestCareStreak = merged.careStreak;
    if (!Array.isArray(merged.daily.locations)) merged.daily.locations = [];
    if (!Array.isArray(merged.daily.pets)) merged.daily.pets = [];
    if (saved.audioVersion !== 2) { merged.muted = false; merged.audioVersion = 2; }
    if (!WEATHER[merged.weather]) merged.weather = "clear";
    const savedLocationLevel = LOCATIONS[merged.location]?.level || 1;
    const restoredLevel = SANCTUARY_LEVELS.reduce((level, item) => (merged.renown >= item.renown ? item.level : level), 1);
    if (savedLocationLevel > restoredLevel) { merged.view = "world"; merged.location = "home"; }
    if (merged.pendingMinigameCost && typeof merged.pendingMinigameCost === "object") {
      Object.entries(merged.pendingMinigameCost).forEach(([key, amount]) => {
        if (INVENTORY_ITEMS[key] && Number.isFinite(amount) && amount > 0) {
          merged.inventory[key] = (merged.inventory[key] || 0) + amount;
        }
      });
      merged.pendingMinigameCost = null;
    }
    return merged;
  } catch { return base; }
}

function furnitureFitLabel(item) {
  if (!item) return "";
  if (item.compatible.length >= PETS.length) return "所有伙伴都能用";
  return `${item.compatible.map(id => petById(id)?.type).filter(Boolean).join("、")}专属`;
}

function normalizeFurnitureState(data) {
  const owned = [...new Set(["starter-bed", ...(data.furnitureOwned || []).filter(id => FURNITURE_CATALOG.some(item => item.id === id))])];
  const placed = {};
  owned.forEach((id, index) => {
    const current = data.furniturePlaced?.[id] || {};
    const fallbackY = id === "starter-bed" ? 78 : 78 - (index % 2) * 10;
    const fallbackX = id === "starter-bed" ? 56 : clamp(28 + (index + 1) * 7, 18, 82);
    const y = Number.isFinite(current.y) ? current.y : fallbackY;
    placed[id] = {
      x: Number.isFinite(current.x) ? current.x : fallbackX,
      y,
      scale: Number.isFinite(current.scale) ? clamp(current.scale, .78, 1.24) : 1,
      rotation: Number.isFinite(current.rotation) ? current.rotation : 0,
      layer: Number.isFinite(current.layer) ? current.layer : y
    };
  });
  data.furnitureOwned = owned;
  data.furniturePlaced = placed;
  if (!owned.includes(data.selectedFurnitureId)) data.selectedFurnitureId = owned[0];
  if (data.pendingFurnishId && !owned.includes(data.pendingFurnishId)) data.pendingFurnishId = null;
  data.furnitureUsedAt = data.furnitureUsedAt && typeof data.furnitureUsedAt === "object" ? data.furnitureUsedAt : {};
  if (data.homeMode !== "furnish") data.homeMode = "life";
  return data;
}

function consumePendingFurnitureArrival() {
  const id = state.pendingFurnishId;
  if (!id || !state.furnitureOwned.includes(id) || statsFor(state.activePetId).asleep) return null;
  state.homeMode = "furnish";
  state.selectedFurnitureId = id;
  state.pendingFurnishId = null;
  return id;
}

let state = loadState();
let idleTween = null;
let idleBehaviorTimer = null;
let frameTimers = new WeakMap();
let activeGameContext = null;
let miniGameSession = null;
let audioContext = null;
let audioMaster = null;
let animalAudio = null;
let weatherAmbience = null;
let snoreTimer = null;
let miniGameTimer = null;
let miniTimers = new Set();
let companionTimeout = null;
let calendarViewMonth = Math.floor((state.day - 1) / CALENDAR_DAYS) + 1;
let calendarSelectedDay = state.day;
let worldAmbientTimeline = null;
let locationAmbientTimeline = null;
let calendarOpenTimeline = null;
let timeAdvanceTimeline = null;
let timeAdvanceSoundTimers = [];
let weatherTransitionTimeline = null;
let weatherTransitionTimeout = null;
let completionFlourishTimer = null;
let completionFlourishTimeline = null;
const lastVoiceVariant = {};

function saveState() {
  const savedAt = Date.now();
  const snapshot = { ...state, savedAt, miniGameActive: false, selectedEventId: null };
  try {
    localStorage.setItem("valleySanctuarySaveV1", JSON.stringify(snapshot));
    state.savedAt = savedAt;
    showSaveStatus(savedAt);
  } catch {
    if (els.saveStatusLabel) els.saveStatusLabel.textContent = "保存失败";
    els.saveStatus?.classList.remove("saving");
  }
}

let saveStatusTimer = null;
function showSaveStatus(savedAt) {
  if (!els.saveStatus || !els.saveStatusLabel) return;
  clearTimeout(saveStatusTimer);
  els.saveStatus.classList.add("saving");
  els.saveStatusLabel.textContent = "保存中";
  saveStatusTimer = setTimeout(() => {
    const time = new Date(savedAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
    els.saveStatus.classList.remove("saving");
    els.saveStatusLabel.textContent = `已保存 ${time}`;
    els.saveStatus.title = `进度已于 ${time} 自动保存`;
    if (window.gsap && !reducedMotion()) gsap.fromTo(els.saveStatus, { scale: .9 }, { scale: 1, duration: .32, ease: "power3.out", clearProps: "transform" });
  }, 180);
}

function statsFor(id) {
  if (!state.petStats[id]) state.petStats[id] = defaultStats();
  else {
    const defaults = defaultStats();
    Object.entries(defaults).forEach(([key, value]) => {
      if (state.petStats[id][key] === undefined) state.petStats[id][key] = value;
    });
  }
  return state.petStats[id];
}

function routineFor(petId = state.activePetId) {
  const current = state.petRoutines[petId];
  if (!current || current.day !== state.day) state.petRoutines[petId] = defaultRoutine(state.day);
  else {
    const defaults = defaultRoutine(state.day);
    Object.entries(defaults).forEach(([key, value]) => {
      if (current[key] === undefined) current[key] = value;
    });
  }
  return state.petRoutines[petId];
}

function backpackUsed() { return Object.values(state.inventory).reduce((sum, count) => sum + Math.max(0, count || 0), 0); }
function backpackSpace() { return Math.max(0, state.backpackCapacity - backpackUsed()); }

function hasPetOrCandidate(id) { return state.ownedPetIds.includes(id) || state.candidates.includes(id); }
function eventKey(event, petId = state.activePetId) {
  const petScoped = event.repeat || event.pet === "active";
  return petScoped ? `${event.id}-pet-${petId}-day-${state.day}` : event.id;
}
function isCompleted(event, petId = state.activePetId) { return state.completed.includes(eventKey(event, petId)); }
function recordCompleted(key) { if (!state.completed.includes(key)) state.completed.push(key); }
function randomEventOrder(event) {
  return [...event.id].reduce((value, character) => (value * 33 + character.charCodeAt(0)) % 100003, state.day * 997 + state.renown * 17);
}
function ensureDailyRandomEvents() {
  if (state.randomEventDay === state.day && state.randomEventIds.length) return;
  const recent = new Set(state.recentRandomEventIds || []);
  const eligible = RANDOM_EVENT_TEMPLATES.filter(event => locationUnlocked(event.location)).sort((a, b) => randomEventOrder(a) - randomEventOrder(b));
  const count = [2, 3, 4, 5, 6, 7, 8][Math.max(0, sanctuaryLevel() - 1)] || 2;
  const fresh = eligible.filter(event => !recent.has(event.id));
  const selected = [...fresh, ...eligible.filter(event => recent.has(event.id))].slice(0, count);
  state.randomEventIds = selected.map(event => event.id);
  state.recentRandomEventIds = [...new Set([...selected.map(event => event.id), ...recent])].slice(0, 12);
  state.randomEventDay = state.day;
}
function allEvents() {
  ensureDailyRandomEvents();
  const randomEvents = RANDOM_EVENT_TEMPLATES.filter(event => state.randomEventIds.includes(event.id));
  const weatherEvents = WEATHER_EVENT_TEMPLATES.filter(event => event.weather === state.weather);
  return [...EVENT_TEMPLATES, ...randomEvents, ...weatherEvents];
}
function eventRequirementsMet(event) { return !event.requiredPets || event.requiredPets.some(id => state.ownedPetIds.includes(id)); }
function activeEvents() {
  return allEvents().filter(event => locationUnlocked(event.location) && eventRequirementsMet(event) && !weatherBlockReason(event.location) && state.minutes >= event.window[0] && state.minutes < event.window[1] && !isCompleted(event) && !(event.unavailable?.()));
}
function eventsAt(location) { return activeEvents().filter(event => event.location === location); }
function eventMatchesActivePet(event, petId = state.activePetId) {
  return !event.pet || event.pet === "active" || event.pet === petId;
}
function currentPetEventsAt(location, petId = state.activePetId) {
  if (statsFor(petId).asleep) return [];
  return eventsAt(location).filter(event => eventMatchesActivePet(event, petId));
}
function publicEventsAt(location) {
  // Rescue targets are valley-wide notices, not a task badge for the selected companion.
  return eventsAt(location).filter(event => event.pet && event.pet !== "active" && !state.ownedPetIds.includes(event.pet));
}
function eventPet(event) {
  const requested = event.pet === "active" ? state.activePetId : event.pet;
  return state.ownedPetIds.includes(requested) ? requested : state.activePetId;
}
function activityKey(activity, petId = state.activePetId) { return `${activity.id}-pet-${petId}-day-${state.day}`; }
function activityDone(activity, petId = state.activePetId) { return state.completed.includes(activityKey(activity, petId)); }
function currentPetMatches(activity) { return !activity.requiredPets || activity.requiredPets.includes(state.activePetId); }
function activitiesAt(location) { return statsFor(state.activePetId).asleep ? [] : (LOCATION_ACTIVITIES[location] || []).filter(currentPetMatches); }

function explorationGamesAt(location = state.location) {
  if (statsFor(state.activePetId).asleep || weatherBlockReason(location)) return [];
  return (EXPLORATION_GAMES[location] || []).filter(game => !game.requiredPets || game.requiredPets.includes(state.activePetId));
}

function resolveSceneMiniGame(game, petId = state.activePetId) {
  const library = PET_GAME_LIBRARY_BY_PET[petId] || [];
  const cards = EXPLORATION_GAMES[state.location] || [];
  const index = Math.max(0, cards.findIndex(item => item.id === game.id));
  const picked = library[index % Math.max(library.length, 1)];
  if (!picked) {
    return { game: game.game, inspectMode: game.inspectMode || "", instruction: game.note };
  }
  const pet = petById(petId);
  return {
    game: picked.engine,
    inspectMode: picked.inspectMode || "",
    instruction: `${pet.name}用${picked.mode}完成「${game.label}」。${game.note}`
  };
}

function homePlayPreview(petId = state.activePetId) {
  const picked = randomPetGame(petId, "home", "home-play");
  return {
    game: picked.engine,
    inspectMode: picked.inspectMode || "",
    mode: picked.mode || miniGameModeLabel(picked.engine, picked.inspectMode || "", petId),
    instruction: `${petById(petId).name}在家园进行${picked.mode}，按提示完成这一轮。`
  };
}

function explorationGamePreview(game) {
  const miniGame = resolveSceneMiniGame(game, state.activePetId);
  return { miniGame, mode: miniGameModeLabel(miniGame.game, miniGame.inspectMode, state.activePetId) };
}

function mobileExplorationPanel() {
  const games = explorationGamesAt(state.location);
  if (!games.length) return "";
  return `<section class="mobile-exploration" aria-label="场景小游戏"><div class="section-heading"><b>场景小游戏</b><span>今日开放</span></div><div class="panel-explore-list">${games.map(game => {
    const { miniGame, mode } = explorationGamePreview(game);
    return `<button class="panel-explore-card" type="button" data-panel-explore-game="${game.id}"><span class="panel-explore-icon"><svg aria-hidden="true"><use href="assets/sprites.svg#${game.icon || "icon-paw"}"></use></svg></span><span><b>${game.label}</b><small>${mode} · ${miniGame.instruction || game.note}</small></span><em>开始</em></button>`;
  }).join("")}</div></section>`;
}

function renderExplorationScenes() {
  if (!els.sceneExplorer || !els.sceneTrack) return;
  const visible = window.innerWidth > 640 && state.view === "location" && !state.miniGameActive && Boolean(EXPLORATION_GAMES[state.location]);
  els.sceneExplorer.hidden = !visible;
  if (!visible) return;
  const games = explorationGamesAt(state.location);
  els.sceneTrack.innerHTML = `<div class="scene-track-heading"><span class="scene-track-kicker">互动任务</span><b>选择一项</b></div>${games.map(game => {
    const { miniGame, mode } = explorationGamePreview(game);
    return `<button class="scene-card" type="button" data-explore-game="${game.id}" data-scene-focus="${game.focus || "center"}"><span class="scene-card-icon"><svg aria-hidden="true"><use href="assets/sprites.svg#${game.icon || "icon-paw"}"></use></svg></span><span><b>${mode} · ${game.label}</b><small>${miniGame.instruction || game.note}</small></span><em>可重复</em></button>`;
  }).join("")}`;
  const syncSceneCamera = () => {
    const cards = [...els.sceneTrack.querySelectorAll("[data-explore-game]")];
    if (!cards.length) return;
    const first = cards[0].getBoundingClientRect();
    const step = Math.max(1, first.width + 10);
    const index = clamp(Math.round(els.sceneTrack.scrollLeft / step), 0, cards.length - 1);
    const activeCard = cards[index];
    els.sceneIndex.textContent = `${index + 1} / ${cards.length}`;
    cards.forEach(card => card.classList.toggle("active", card === activeCard));
    els.location.dataset.sceneFocus = activeCard.dataset.sceneFocus || "center";
  };
  if (els.sceneTrack._syncSceneCamera) els.sceneTrack.removeEventListener("scroll", els.sceneTrack._syncSceneCamera);
  els.sceneTrack._syncSceneCamera = syncSceneCamera;
  els.sceneTrack.addEventListener("scroll", syncSceneCamera, { passive: true });
  els.sceneTrack.querySelectorAll("[data-explore-game]").forEach(button => button.addEventListener("click", () => startExplorationGame(button.dataset.exploreGame)));
  els.scenePrev.onclick = () => els.sceneTrack.scrollBy({ left: -260, behavior: "smooth" });
  els.sceneNext.onclick = () => els.sceneTrack.scrollBy({ left: 260, behavior: "smooth" });
  requestAnimationFrame(syncSceneCamera);
}

function startExplorationGame(id) {
  const game = (EXPLORATION_GAMES[state.location] || []).find(item => item.id === id);
  if (!game || !explorationGamesAt(state.location).some(item => item.id === id)) return;
  const petId = state.activePetId;
  if (statsFor(petId).asleep) { toast("开始探索前需要先叫醒伙伴。"); return; }
  const blocked = activityWeatherBlockedReason(game, state.location);
  if (blocked) { toast(blocked); return; }
  const missing = missingCost(game.cost);
  if (missing) { toast(`需要先准备${missing}。`); return; }
  spendCost(game.cost);
  state.pendingMinigameCost = game.cost ? { ...game.cost } : null;
  els.location.dataset.sceneFocus = game.focus || "center";
  const miniGame = resolveSceneMiniGame(game, petId);
  activeGameContext = { type: "freeplay", game, reward: game.reward, location: state.location, petId };
  launchMiniGame(miniGame.game, petId, `${game.label} · ${miniGameModeLabel(miniGame.game, miniGame.inspectMode, petId)}`, miniGame.instruction || game.note, miniGame.inspectMode);
}

function petNeedStatus(id) {
  const stats = statsFor(id);
  const needs = [];
  const addLow = (key, label, threshold = 45) => {
    if (stats[key] < threshold) needs.push({ label, score: threshold - stats[key] });
  };
  addLow("hunger", "需要进食");
  addLow("clean", "需要清洁");
  addLow("mood", "需要陪伴");
  addLow("energy", "需要休息");
  addLow("health", "需要检查", 55);
  addLow("comfort", "需要安抚");
  if (stats.stress > 55) needs.push({ label: "压力偏高", score: stats.stress - 55 });
  needs.sort((a, b) => b.score - a.score);
  return { urgent: needs.length > 0, score: needs[0]?.score || 0, label: needs[0]?.label || "状态良好" };
}

function dockVisibleLimit() { return window.innerWidth <= 640 ? 4 : window.innerWidth <= 900 ? 5 : 7; }

function setDockExpanded(expanded, overflowCount = Math.max(0, state.ownedPetIds.length - dockVisibleLimit())) {
  const canExpand = overflowCount > 0;
  const next = canExpand && expanded;
  document.body.classList.toggle("dock-expanded", next);
  els.dockToggle.hidden = !canExpand;
  els.dockToggle.setAttribute("aria-expanded", String(next));
  els.dockToggle.setAttribute("aria-label", next ? "收起更多家园伙伴" : `显示其余 ${overflowCount} 位家园伙伴`);
  els.dockToggle.title = next ? "收起更多伙伴" : `还有 ${overflowCount} 位伙伴`;
  els.dockToggle.querySelector("span").textContent = next ? "收起" : `+${overflowCount}`;
}
function contractOrder(contract) {
  return [...contract.id].reduce((value, character) => (value * 31 + character.charCodeAt(0)) % 65521, state.day * 811 + state.renown * 7);
}
function ensureDailyContracts() {
  if (state.contractDay === state.day && state.contractIds.length === 3) return;
  const eligible = CONTRACT_TEMPLATES.filter(contract => !contract.available || contract.available()).sort((a, b) => contractOrder(a) - contractOrder(b));
  state.contractIds = eligible.slice(0, 3).map(contract => contract.id);
  state.claimedContracts = [];
  state.contractDay = state.day;
}
function dailyContracts() {
  ensureDailyContracts();
  return state.contractIds.map(id => CONTRACT_TEMPLATES.find(contract => contract.id === id)).filter(Boolean);
}
function contractProgress(contract) {
  const values = {
    events: state.daily.events,
    care: state.daily.care,
    locations: state.daily.locations.length,
    coins: state.daily.coins,
    routine: bestRoutineDoneCount(),
    chance: state.daily.randomEvents,
    companions: state.daily.pets.length
  };
  return Math.min(contract.target, values[contract.id] || 0);
}
function achievementProgress(achievement) {
  if (achievement.metric === "locations") return Object.keys(state.records.locations).length;
  if (achievement.metric === "owned") return state.ownedPetIds.length;
  if (achievement.metric === "bestStreak") return state.bestCareStreak;
  return state.records[achievement.metric] || 0;
}
function rewardFitsBackpack(reward = {}) {
  const needed = Object.entries(reward).reduce((sum, [key, value]) => sum + (INVENTORY_ITEMS[key] ? Math.max(0, value) : 0), 0);
  return needed <= backpackSpace();
}
function journalReadyCount() {
  const contractCount = dailyContracts().filter(contract => !state.claimedContracts.includes(contract.id) && contractProgress(contract) >= contract.target && rewardFitsBackpack(contract.reward)).length;
  const achievementCount = ACHIEVEMENTS.filter(achievement => !state.achievementsClaimed.includes(achievement.id) && achievementProgress(achievement) >= achievement.target && rewardFitsBackpack(achievement.reward)).length;
  return contractCount + achievementCount;
}
function weatherForDay(day) {
  const pattern = ["clear", "cloudy", "rain", "drizzle", "wind", "fog", "heavyRain", "partlyCloudy", "thunderstorm", "coldSnap", "clear", "rain", "partlyCloudy", "drizzle"];
  return pattern[(day - 1) % pattern.length];
}

function calendarMonthForDay(day) { return Math.floor((day - 1) / CALENDAR_DAYS) + 1; }
function calendarDayOfMonth(day) { return ((day - 1) % CALENDAR_DAYS) + 1; }
function calendarMonthStart(month) { return (month - 1) * CALENDAR_DAYS + 1; }
function calendarSeason(month) { return SEASON_NAMES[Math.floor((month - 1) / 3) % SEASON_NAMES.length]; }

function scheduledCalendarEvents(day) {
  const date = calendarDayOfMonth(day);
  const weekday = ((day - 1) % 7) + 1;
  const schedule = [];
  if (weekday === 2) schedule.push({ title: "溪桥补给集市", note: "基础食物、护理用品与玩具集中补货。", time: "09:00", location: "market", kind: "集市" });
  if (weekday === 3) schedule.push({ title: "救助动物接收", note: "整理安置空间，检查新到动物的状态。", time: "08:00", location: "rescue", kind: "救助" });
  if (weekday === 5) schedule.push({ title: "山谷巡回义诊", note: "为伙伴进行健康记录，补充常用护理物资。", time: "13:00", location: "clinic", kind: "健康" });
  if (weekday === 6) schedule.push({ title: "伙伴训练聚会", note: "完成轻量训练，提升信赖与成长经验。", time: "15:00", location: "training", kind: "训练" });
  if (date === 1) schedule.push({ title: "月度照管盘点", note: "检查物资、住所容量与本月待办。", time: "07:30", location: "home", kind: "经营" });
  if (CALENDAR_FESTIVALS[date]) schedule.unshift(CALENDAR_FESTIVALS[date]);
  return schedule.length ? schedule : [{ title: "日常照管与巡访", note: "依照天气和动物状态自由安排今天。", time: "全天", location: "home", kind: "日常" }];
}

function calendarDayInfo(day) {
  return {
    day,
    date: calendarDayOfMonth(day),
    weekday: WEEKDAY_NAMES[(day - 1) % 7],
    schedule: scheduledCalendarEvents(day),
    history: state.calendarHistory[String(day)] || null,
    isToday: day === state.day,
    isPast: day < state.day
  };
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function clockHandAngles(minutes) {
  return { hour: (minutes % 720) * .5, minute: (minutes % 60) * 6 };
}

function syncAdvanceClock(minutes = state.minutes) {
  const angles = clockHandAngles(minutes);
  if (els.advanceHour) els.advanceHour.style.transform = `rotate(${angles.hour}deg)`;
  if (els.advanceMinute) els.advanceMinute.style.transform = `rotate(${angles.minute}deg)`;
}

function periodFor(minutes) {
  if (minutes < 600) return "清晨";
  if (minutes < 780) return "上午";
  if (minutes < 1020) return "午后";
  if (minutes < 1170) return "傍晚";
  return "夜间";
}

function growthLevel(stats) { return Math.min(10, 1 + Math.floor(stats.growth / 80)); }
function growthStage(stats) {
  if (stats.growth >= 480) return "家园明星";
  if (stats.growth >= 240) return "亲密伙伴";
  if (stats.growth >= 80) return "熟悉生活";
  return "初来家园";
}
function isPetActiveNow(pet) { return state.minutes >= pet.activeWindow[0] && state.minutes < pet.activeWindow[1]; }
function routineSteps() {
  return [
    { id: "breakfast", label: "吃好早餐" },
    { id: "outing", label: "外出见闻" },
    { id: "bond", label: "陪伴互动" },
    { id: "clean", label: "保持整洁" },
    { id: "sleep", label: "安心睡足" }
  ];
}
function routineDoneCount(petId = state.activePetId) { const routine = routineFor(petId); return routineSteps().filter(step => routine[step.id]).length; }
function bestRoutineDoneCount() { return state.ownedPetIds.reduce((best, petId) => Math.max(best, routineDoneCount(petId)), 0); }
function careStreakMilestone(streak) {
  if (!streak || (streak % 7 !== 0 && streak % 3 !== 0)) return null;
  return streak % 7 === 0
    ? { label: "七日照管里程碑", reward: { coins: 45, reputation: 3 } }
    : { label: "三日照管里程碑", reward: { coins: 18, reputation: 1 } };
}

function setAnimatedText(element, value, accent = "#ffe083") {
  const next = String(value);
  const previous = element.dataset.renderValue;
  element.textContent = next;
  element.dataset.renderValue = next;
  if (previous === undefined || previous === next || !window.gsap || reducedMotion()) return;
  gsap.killTweensOf(element);
  const shell = element.closest(".resource, .clock-value, .inventory-button") || element.parentElement;
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .fromTo(element, { y: 8, scale: .7, color: accent, textShadow: `0 0 16px ${accent}` }, { y: 0, scale: 1, color: "inherit", textShadow: "0 0 0 transparent", duration: .42, clearProps: "transform,color,text-shadow" }, 0)
    .fromTo(shell, { scale: 1 }, { scale: 1.055, duration: .16, yoyo: true, repeat: 1, clearProps: "transform" }, 0);
}

function renderResources() {
  setAnimatedText(els.coins, state.coins);
  setAnimatedText(els.reputation, state.reputation, "#ff9b89");
  const levelInfo = sanctuaryLevelInfo();
  const nextLevel = nextSanctuaryLevel();
  setAnimatedText(els.level, `Lv.${levelInfo.level}`, "#9ce8f4");
  els.level.closest(".resource").title = nextLevel ? `${levelInfo.title}，累计口碑 ${state.renown} / ${nextLevel.renown}` : `${levelInfo.title}，已达到最高等级`;
  const rankProgress = nextLevel ? clamp((state.renown - levelInfo.renown) / (nextLevel.renown - levelInfo.renown), 0, 1) : 1;
  els.rankTitle.textContent = `Lv.${levelInfo.level} · ${levelInfo.title}`;
  els.rankProgressText.textContent = nextLevel ? `累计口碑 ${state.renown} / ${nextLevel.renown}` : `累计口碑 ${state.renown} · 最高等级`;
  els.rankProgress.style.transform = `scaleX(${rankProgress})`;
  els.rankProgress.parentElement.setAttribute("aria-valuenow", String(Math.round(rankProgress * 100)));
  if (els.careStreak) {
    els.careStreak.querySelector("small").textContent = `${state.careStreak} 天`;
    els.careStreak.title = state.careStreak ? `连续完成至少四项生活日程，最佳 ${state.bestCareStreak} 天` : "连续完成至少四项生活日程，今天尚未结算";
    els.careStreak.classList.toggle("active", state.careStreak > 0);
  }
  setAnimatedText(els.time, formatTime(state.minutes));
  if (!timeAdvanceTimeline) syncAdvanceClock(state.minutes);
  const advanceAmount = timeAdvanceAmount();
  const advanceLabel = advanceAmount === 180 ? "+3 小时" : "+30 分钟";
  els.advance.querySelector(".advance-copy b").textContent = advanceLabel;
  els.advance.title = `让山谷时间向前推进${advanceAmount === 180 ? " 3 小时" : " 30 分钟"}`;
  els.advance.setAttribute("aria-label", `推进游戏时间${advanceAmount === 180 ? " 3 小时" : " 30 分钟"}`);
  els.advance.classList.toggle("long-step", advanceAmount === 180);
  els.period.textContent = periodFor(state.minutes);
  const month = calendarMonthForDay(state.day);
  els.season.textContent = `${calendarSeason(month)} · ${month}月${calendarDayOfMonth(state.day)}日`;
  els.calendar.setAttribute("aria-label", `打开经营日历，今天是第 ${state.day} 天`);
  els.capacity.textContent = `${state.ownedPetIds.length} / ${state.capacity}`;
  setAnimatedText(els.backpackCount, backpackUsed(), "#ffe083");
  els.backpackCount.title = `背包 ${backpackUsed()} / ${state.backpackCapacity}`;
  els.sound.setAttribute("aria-pressed", String(state.muted));
  els.sound.setAttribute("aria-label", state.muted ? "开启音效" : "关闭音效");
  els.sound.title = state.muted ? "音效已关闭，点击开启" : "音效已开启，点击关闭";
  els.sound.classList.toggle("muted", state.muted);
  const readyCount = journalReadyCount();
  els.journalBadge.hidden = readyCount === 0;
  els.journalBadge.textContent = String(readyCount);
  els.help.setAttribute("aria-label", readyCount ? `打开经营日志，有 ${readyCount} 项奖励可领取` : "打开经营日志");
  const progress = clamp((state.minutes - 420) / 900, 0, 1);
  els.timeProgress.style.transform = `scaleX(${progress})`;
  els.timeProgress.parentElement.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
  const night = state.minutes < 480 ? .14 : state.minutes > 1050 ? clamp((state.minutes - 1050) / 420, 0, .46) : 0;
  document.documentElement.style.setProperty("--night-opacity", night.toFixed(2));
  els.sun.style.transform = `translateY(${Math.sin(progress * Math.PI) * -6}px)`;
  els.sun.style.background = state.minutes > 1080 ? "#e9894c" : "#f3c64f";
}

function activeMapTheme() {
  return MAP_THEMES.find(theme => theme.id === state.mapThemeId) || MAP_THEMES[0];
}

function mapLocationPosition(id) {
  const location = LOCATIONS[id];
  const position = activeMapTheme().positions?.[id];
  return position ? { x: position[0], y: position[1] } : { x: location.x, y: location.y };
}

function mapSceneEvent() {
  return MAP_SCENE_EVENTS[activeMapTheme().id] || MAP_SCENE_EVENTS.spring;
}

function renderMapTheme() {
  const theme = activeMapTheme();
  if (els.world) els.world.dataset.mapTheme = theme.id;
  if (els.mapThemeButton) {
    els.mapThemeButton.textContent = theme.id === "night" ? "☾" : theme.id === "winter" ? "❄" : theme.id === "autumn" ? "◒" : theme.id === "summer" ? "☀" : "◐";
    els.mapThemeButton.title = `地图场景：${theme.label} · ${theme.note}。点击切换`;
    els.mapThemeButton.setAttribute("aria-label", `地图场景：${theme.label}，点击切换`);
  }
  if (els.mapThemeLabel) els.mapThemeLabel.textContent = `${theme.label} · ${theme.note}`;
  if (els.mapSceneTransitionLabel) els.mapSceneTransitionLabel.textContent = theme.label;
  if (els.worldMapSource) els.worldMapSource.srcset = theme.mobileImage;
  if (els.worldMap) {
    if (!els.worldMap.src.endsWith(theme.image)) els.worldMap.src = theme.image;
    els.worldMap.alt = theme.alt;
    els.worldMap.style.setProperty("--map-theme-filter", "none");
    els.worldMap.dataset.mapScene = theme.id;
  }
}

let mapSceneTransitionTimer = null;
function playMapSceneTransition(previousSource, theme) {
  if (!els.world || !els.worldMapPrevious || !previousSource || previousSource.endsWith(theme.image)) return;
  els.worldMapPrevious.src = previousSource;
  els.worldMapPrevious.hidden = false;
  clearTimeout(mapSceneTransitionTimer);
  if (reducedMotion()) { els.worldMapPrevious.hidden = true; return; }
  els.world.classList.remove("map-scene-changing");
  void els.world.offsetWidth;
  requestAnimationFrame(() => els.world.classList.add("map-scene-changing"));
  mapSceneTransitionTimer = setTimeout(() => {
    els.world.classList.remove("map-scene-changing");
    els.worldMapPrevious.hidden = true;
    mapSceneTransitionTimer = null;
  }, 760);
}

function cycleMapTheme() {
  const previousSource = els.worldMap?.currentSrc || els.worldMap?.src || "";
  const index = MAP_THEMES.findIndex(theme => theme.id === state.mapThemeId);
  state.mapThemeId = MAP_THEMES[(index + 1) % MAP_THEMES.length].id;
  const theme = activeMapTheme();
  playMapSceneTransition(previousSource, theme);
  renderMapTheme();
  renderMap();
  saveState();
  toast(`大地图已切换为${activeMapTheme().label}。`);
}

function renderMap() {
  const counts = Object.fromEntries(Object.keys(LOCATIONS).map(id => [id, currentPetEventsAt(id).length]));
  const publicCounts = Object.fromEntries(Object.keys(LOCATIONS).map(id => [id, publicEventsAt(id).length]));
  const sceneEvent = mapSceneEvent();
  els.mapLocations.innerHTML = Object.entries(LOCATIONS).map(([id, location]) => {
    const position = mapLocationPosition(id);
    const unlocked = locationUnlocked(id);
    const weatherReason = unlocked ? weatherBlockReason(id) : "";
    const available = unlocked && !weatherReason;
    const exclusiveActivities = available ? activitiesAt(id).filter(activity => activity.requiredPets && !activityDone(activity) && !activityWeatherBlockedReason(activity, id)).length : 0;
    const signalCount = counts[id] + exclusiveActivities;
    const sceneSignal = sceneEvent.location === id;
    const statusText = weatherReason || (counts[id] ? `${counts[id]} 件事正在发生${exclusiveActivities ? " · 专属活动开放" : ""}${sceneSignal ? ` · ${sceneEvent.label}` : ""}` : exclusiveActivities ? "伙伴专属活动开放" : sceneSignal ? sceneEvent.title : location.hint);
    const sceneAria = sceneSignal ? `，场景事件：${sceneEvent.title}` : "";
    return `
    <button class="map-hotspot ${unlocked ? "" : "locked"} ${weatherReason ? "weather-closed" : ""} ${exclusiveActivities ? "has-pet-activity" : ""} ${sceneSignal ? "has-scene-event" : ""}" data-location="${id}" style="left:${position.x}%;top:${position.y}%;--spot-color:${location.color}" aria-label="${!unlocked ? `${location.name}，家园等级 ${location.level} 解锁` : weatherReason ? `${location.name}，${weatherReason}` : `进入${location.name}${counts[id] ? `，有 ${counts[id]} 个事件` : ""}${exclusiveActivities ? "，伙伴专属活动开放" : ""}${sceneAria}`}" ${available ? "" : "disabled"}>
      <span class="hotspot-symbol"><svg aria-hidden="true"><use href="assets/sprites.svg#${location.icon}"></use></svg></span>
      <span class="hotspot-copy"><b>${location.name}</b><small>${unlocked ? statusText : `Lv.${location.level} 解锁`}</small></span>
      ${signalCount ? `<span class="event-badge" aria-hidden="true">${signalCount}</span>` : sceneSignal ? `<span class="event-badge scene-event-badge" aria-label="${sceneEvent.label}" title="${sceneEvent.title}">✦</span>` : publicCounts[id] ? `<span class="event-badge public-event-badge" aria-label="有山谷救助事项" title="有山谷救助事项"><svg aria-hidden="true"><use href="assets/sprites.svg#icon-note"></use></svg></span>` : ""}
    </button>`;
  }).join("");
  renderWorldExpansions();
  els.mapLocations.querySelectorAll("[data-location]").forEach(button => button.addEventListener("click", () => enterLocation(button.dataset.location)));
  requestAnimationFrame(syncMapPan);
  renderTicker();
}

function renderWorldExpansions() {
  if (!els.mapExpansions) return;
  const expansions = ["saltmarsh", "greenhouse"].filter(locationUnlocked);
  els.mapExpansions.innerHTML = expansions.map(id => {
    const location = LOCATIONS[id];
    const position = mapLocationPosition(id);
    return `<article class="world-expansion world-expansion-${id}" data-expansion-location="${id}" style="left:${position.x}%;top:${position.y}%"><img src="${location.image}" alt="${location.name}地图预览" loading="lazy" /><div><b>${location.name}</b><small>已解锁 · ${location.hint}</small></div></article>`;
  }).join("");
}

function mapPanMaxScroll() {
  return Math.max(0, (els.worldPanorama?.scrollWidth || 0) - (els.worldPanorama?.clientWidth || 0));
}

function syncMapPan() {
  if (!els.worldPanorama) return;
  const max = mapPanMaxScroll();
  const ratio = clamp(Number(state.mapScrollRatio) || 0, 0, 1);
  if (max > 0 && Math.abs(els.worldPanorama.scrollLeft - max * ratio) > 2 && !els.worldPanorama.dataset.userPan) {
    els.worldPanorama.scrollLeft = max * ratio;
  }
  const boundedScroll = clamp(els.worldPanorama.scrollLeft, 0, max);
  if (Math.abs(els.worldPanorama.scrollLeft - boundedScroll) > 1) els.worldPanorama.scrollLeft = boundedScroll;
  const currentRatio = max ? boundedScroll / max : 0;
  els.worldPanorama.dataset.panRatio = currentRatio.toFixed(3);
  els.worldPanorama.setAttribute("aria-label", `可横向探索的山谷地图，当前位置 ${Math.round(currentRatio * 100)}%`);
  els.mapPanPrev.disabled = currentRatio <= .01;
  els.mapPanNext.disabled = currentRatio >= .99;
}

let mapPanSaveTimer = null;
function rememberMapPan() {
  if (!els.worldPanorama) return;
  const max = mapPanMaxScroll();
  const boundedScroll = clamp(els.worldPanorama.scrollLeft, 0, max);
  if (Math.abs(els.worldPanorama.scrollLeft - boundedScroll) > 1) els.worldPanorama.scrollLeft = boundedScroll;
  state.mapScrollRatio = max ? boundedScroll / max : 0;
  syncMapPan();
  clearTimeout(mapPanSaveTimer);
  mapPanSaveTimer = setTimeout(() => saveState(), 240);
}

function panMapBy(direction) {
  if (!els.worldPanorama) return;
  const max = mapPanMaxScroll();
  const step = Math.max(260, els.worldPanorama.clientWidth * .55);
  scrollMapTo(els.worldPanorama.scrollLeft + direction * step, "smooth");
}

function scrollMapTo(target, behavior = "auto") {
  if (!els.worldPanorama) return;
  const boundedTarget = clamp(target, 0, mapPanMaxScroll());
  if (typeof els.worldPanorama.scrollTo === "function") {
    try { els.worldPanorama.scrollTo({ left: boundedTarget, behavior }); } catch { els.worldPanorama.scrollLeft = boundedTarget; }
  } else els.worldPanorama.scrollLeft = boundedTarget;
}

function installMapPanInteraction() {
  if (!els.worldPanorama || els.worldPanorama.dataset.panReady) return;
  els.worldPanorama.dataset.panReady = "true";
  let drag = null;
  let suppressClickUntil = 0;
  els.worldPanorama.addEventListener("scroll", rememberMapPan, { passive: true });
  els.worldPanorama.addEventListener("pointerdown", event => {
    if (event.target.closest("button, a")) return;
    event.preventDefault();
    drag = { x: event.clientX, scroll: els.worldPanorama.scrollLeft, moved: false };
    els.worldPanorama.dataset.userPan = "true";
    els.worldPanorama.setPointerCapture?.(event.pointerId);
    els.worldPanorama.classList.add("is-panning");
  });
  els.worldPanorama.addEventListener("pointermove", event => {
    if (!drag) return;
    event.preventDefault();
    if (Math.abs(event.clientX - drag.x) >= 6) drag.moved = true;
    const max = mapPanMaxScroll();
    els.worldPanorama.scrollLeft = clamp(drag.scroll - (event.clientX - drag.x), 0, max);
  });
  const endDrag = event => {
    if (!drag) return;
    if (drag.moved) suppressClickUntil = performance.now() + 360;
    drag = null;
    els.worldPanorama.releasePointerCapture?.(event.pointerId);
    els.worldPanorama.classList.remove("is-panning");
    delete els.worldPanorama.dataset.userPan;
    rememberMapPan();
  };
  els.worldPanorama.addEventListener("pointerup", endDrag);
  els.worldPanorama.addEventListener("pointercancel", endDrag);
  els.worldPanorama.addEventListener("click", event => {
    if (performance.now() >= suppressClickUntil) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
  els.worldPanorama.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const max = mapPanMaxScroll();
    if (event.key === "ArrowLeft") panMapBy(-1);
    if (event.key === "ArrowRight") panMapBy(1);
    if (event.key === "Home") scrollMapTo(0, "smooth");
    if (event.key === "End") scrollMapTo(max, "smooth");
  });
  syncMapPan();
}

function renderTicker() {
  const active = activeEvents().filter(event => eventMatchesActivePet(event));
  const sceneEvent = mapSceneEvent();
  const next = active[0] || allEvents()
    .filter(event => eventMatchesActivePet(event) && locationUnlocked(event.location) && eventRequirementsMet(event) && !weatherBlockReason(event.location) && !isCompleted(event) && !(event.unavailable?.()) && event.window[0] > state.minutes)
    .sort((a, b) => a.window[0] - b.window[0])[0];
  if (!next) {
    const signature = `scene:${activeMapTheme().id}`;
    const changed = els.eventTicker.dataset.signature && els.eventTicker.dataset.signature !== signature;
    els.eventTicker.dataset.signature = signature;
    els.eventTicker.innerHTML = `<span class="ticker-time">${sceneEvent.label}</span><span class="ticker-copy"><b>${sceneEvent.title}</b><small>${LOCATIONS[sceneEvent.location].name} · ${sceneEvent.summary}</small></span>`;
    if (changed) animateTickerChange();
    return;
  }
  const isActive = active.includes(next);
  const signature = `${next.id}:${isActive ? "active" : "upcoming"}`;
  const changed = Boolean(els.eventTicker.dataset.signature && els.eventTicker.dataset.signature !== signature);
  els.eventTicker.dataset.signature = signature;
  els.eventTicker.innerHTML = `
    <span class="ticker-time">${isActive ? "正在发生" : formatTime(next.window[0])}</span>
    <span class="ticker-copy"><b>${next.title}</b><small>${LOCATIONS[next.location].name} · ${next.summary}</small><em class="ticker-scene-note">${sceneEvent.label} · ${sceneEvent.title}</em></span>
    ${isActive ? `<button class="ticker-go" data-event-go="${next.id}">前往</button>` : ""}`;
  els.eventTicker.querySelector("[data-event-go]")?.addEventListener("click", () => openEvent(next.id));
  if (changed) animateTickerChange();
}

function animateTickerChange() {
  if (!window.gsap || reducedMotion() || els.world.hidden) return;
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .fromTo(els.eventTicker, { y: 22, scale: .94, autoAlpha: .2 }, { y: 0, scale: 1, autoAlpha: 1, duration: .42, clearProps: "transform,opacity,visibility" }, 0)
    .fromTo(els.eventTicker.children, { x: 18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .34, stagger: .055, clearProps: "transform,opacity,visibility" }, .08);
}

function renderRoster() {
  const order = new Map(state.ownedPetIds.map((id, index) => [id, index]));
  const sortedIds = [...state.ownedPetIds].sort((a, b) => {
    const needDelta = petNeedStatus(b).score - petNeedStatus(a).score;
    if (needDelta) return needDelta;
    if (a === state.activePetId) return -1;
    if (b === state.activePetId) return 1;
    return order.get(a) - order.get(b);
  });
  const limit = dockVisibleLimit();
  els.roster.innerHTML = sortedIds.map((id, index) => {
    const pet = petById(id);
    const stats = statsFor(id);
    const need = petNeedStatus(id);
    const stateLabel = stats.asleep ? "，正在睡觉" : need.urgent ? `，${need.label}` : "，状态良好";
    return `<button class="pet-chip ${id === state.activePetId ? "active" : ""} ${stats.asleep ? "sleeping" : ""} ${index >= limit ? "is-overflow" : ""}" data-pet-id="${id}" aria-pressed="${id === state.activePetId}" aria-label="选择${pet.name}，等级 ${growthLevel(stats)}${stateLabel}" title="${pet.name} · Lv.${growthLevel(stats)} · ${stats.asleep ? "正在睡觉" : need.label}"><span class="pet-portrait"><img src="${pet.image}" alt="" />${need.urgent ? `<i class="need-mark" aria-hidden="true">!</i>` : ""}${stats.asleep ? `<i class="sleep-dot" aria-hidden="true"></i>` : ""}</span><span class="pet-name">${pet.name}</span></button>`;
  }).join("");
  els.roster.querySelectorAll("[data-pet-id]").forEach(button => button.addEventListener("click", () => selectPet(button.dataset.petId)));
  setDockExpanded(document.body.classList.contains("dock-expanded"), Math.max(0, sortedIds.length - limit));
}

function selectPet(id) {
  if (!state.ownedPetIds.includes(id)) return;
  const previousPetId = state.activePetId;
  stopSnoreLoop();
  state.activePetId = id;
  saveState();
  renderRoster();
  showPet(id, "idle");
  if (state.view === "location") {
    speak(`${petById(id).name}来到你身边。`);
    renderLocationPanel();
  }
  if (els.inventoryDialog.open) renderInventory();
  if (statsFor(id).asleep) state.homeMode = "life";
  if (state.view === "location" && state.location === "home") renderHomeFurnishings();
  if (statsFor(id).asleep && state.location === "home") startSnoreLoop();
  setDockExpanded(false);
  playPetVoice(id, "soft");
  animatePetSelection(id, previousPetId);
}

function animatePetSelection(petId, previousPetId) {
  if (!window.gsap || reducedMotion()) return;
  const chip = els.roster.querySelector(`[data-pet-id="${petId}"] .pet-portrait`);
  if (chip) gsap.fromTo(chip, { y: 8, scale: .72, rotation: -6 }, { y: 0, scale: 1, rotation: 0, duration: .42, ease: "power3.out", clearProps: "transform" });
  if (state.view !== "location" || statsFor(petId).asleep) return;
  const previousIndex = state.ownedPetIds.indexOf(previousPetId);
  const nextIndex = state.ownedPetIds.indexOf(petId);
  const direction = nextIndex >= previousIndex ? 1 : -1;
  gsap.killTweensOf(els.petSprite);
  gsap.fromTo(els.petSprite, { x: direction * 56, y: 18, scale: .9, autoAlpha: .35 }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: .52, ease: "power4.out", clearProps: "transform,opacity,visibility" });
}

function enterLocation(id, selectedEventId = null) {
  const location = LOCATIONS[id];
  if (!location) return;
  if (!locationUnlocked(id)) { toast(`${location.name}将在家园 Lv.${location.level} 解锁。`); return; }
  const weatherReason = weatherBlockReason(id);
  if (weatherReason) { toast(`${location.name}暂不开放：${weatherReason}。`); return; }
  if (!state.daily.locations.includes(id)) state.daily.locations.push(id);
  state.records.locations[id] = (state.records.locations[id] || 0) + 1;
  if (id !== "home" && statsFor(state.activePetId).asleep) {
    toast(`先叫醒${petById(state.activePetId).name}，再带它出门。`);
    return;
  }
  state.view = "location";
  state.location = id;
  state.selectedEventId = selectedEventId;
  const arrivedFurnitureId = id === "home" ? consumePendingFurnitureArrival() : null;
  const presentation = locationPresentation(id);
  els.location.dataset.location = id;
  els.location.dataset.sceneFocus = "center";
  els.location.dataset.sheltered = String(presentation.sheltered);
  els.location.style.setProperty("--location-art", `url("${presentation.image}")`);
  els.locationPanel.classList.remove("expanded");
  els.world.hidden = true;
  els.location.hidden = false;
  els.location.classList.add("loading");
  const finishSceneLoad = () => els.location.classList.remove("loading");
  els.locationArt.addEventListener("load", finishSceneLoad, { once: true });
  els.locationArt.addEventListener("error", finishSceneLoad, { once: true });
  els.locationArt.src = presentation.image;
  els.locationArt.alt = presentation.title;
  if (els.locationArt.complete) finishSceneLoad();
  renderLocationDetails(id);
  renderWeatherEffects();
  els.locationKicker.textContent = presentation.kicker;
  els.locationTitle.textContent = presentation.title;
  els.locationStatus.textContent = presentation.status || (currentPetEventsAt(id).length ? `${currentPetEventsAt(id).length} 件事正在发生` : presentation.hint);
  const selectedEvent = selectedEventId ? allEvents().find(event => event.id === selectedEventId) : null;
  showPet(selectedEvent ? eventPet(selectedEvent) : state.activePetId, "idle");
  renderHomeFurnishings();
  if (id === "home") {
    const arrived = arrivedFurnitureId ? FURNITURE_CATALOG.find(item => item.id === arrivedFurnitureId) : null;
    speak(arrived ? `${arrived.name}已经放到地面上，先拖到你想要的位置。` : presentation.hint);
  }
  renderLocationPanel();
  animateLocationIn();
  startLocationAmbientMotion();
  saveState();
}

function renderLocationDetails(locationId = state.location) {
  const detail = LOCATION_SCENE_DETAILS[locationId];
  if (!els.locationDetails || !detail) return;
  els.locationDetails.dataset.location = locationId;
  els.locationDetails.innerHTML = `<div class="scene-detail-strip"><span class="scene-detail-texture">${detail.texture}</span><span class="scene-detail-marker">${detail.markers[0]}</span><span class="scene-detail-marker">${detail.markers[1]}</span></div><div class="scene-detail-layer scene-detail-foreground">${detail.foreground.map((label, index) => `<span class="scene-prop prop-${index + 1}">${label}</span>`).join("")}</div><div class="scene-detail-layer scene-detail-distant">${detail.distant.map((label, index) => `<span class="scene-activity activity-${index + 1}">${label}</span>`).join("")}</div>`;
}

function showWorld() {
  if (state.miniGameActive) cancelMiniGame();
  state.view = "world";
  state.selectedEventId = null;
  els.location.hidden = true;
  els.world.hidden = false;
  stopPetFrames(els.petSprite);
  stopSnoreLoop();
  renderHomeFurnishings();
  renderMap();
  animateWorldIn();
  startWorldAmbientMotion();
  saveState();
}

function animateWorldIn() {
  if (!window.gsap || reducedMotion()) return;
  const hotspots = [...els.mapLocations.querySelectorAll(".map-hotspot")];
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .fromTo(els.worldMapPlane, { scale: 1.06, filter: "brightness(.78)" }, { scale: 1, filter: "brightness(1)", duration: .68, clearProps: "transform,filter" }, 0)
    .fromTo(els.world.querySelectorAll(".world-heading > *"), { x: -30, y: 10, autoAlpha: .18 }, { x: 0, y: 0, autoAlpha: 1, duration: .46, stagger: .07, clearProps: "transform,opacity,visibility" }, .08)
    .fromTo(hotspots, { y: 24, scale: .82, autoAlpha: .15 }, { y: 0, scale: 1, autoAlpha: 1, duration: .48, stagger: { each: .035, amount: .28 }, clearProps: "transform,opacity,visibility" }, .12)
    .fromTo(els.eventTicker, { y: 26, scale: .96, autoAlpha: .1 }, { y: 0, scale: 1, autoAlpha: 1, duration: .46, clearProps: "transform,opacity,visibility" }, .34);
}

function animateLocationIn() {
  if (!window.gsap || reducedMotion()) return;
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .fromTo(els.locationArt, { scale: 1.075, filter: "brightness(.72) saturate(.82)" }, { scale: 1, filter: "brightness(1) saturate(1)", duration: .72, clearProps: "transform,filter" }, 0)
    .fromTo(els.location.querySelectorAll(".location-heading > *"), { x: -34, y: 12, autoAlpha: .12 }, { x: 0, y: 0, autoAlpha: 1, duration: .48, stagger: .07, clearProps: "transform,opacity,visibility" }, .08)
    .fromTo(els.petSprite, { y: 38, scale: .84, autoAlpha: .12 }, { y: 0, scale: 1, autoAlpha: 1, duration: .62, clearProps: "transform,opacity,visibility" }, .12)
    .fromTo(els.locationPanel, { x: 72, scale: .97, autoAlpha: .08 }, { x: 0, scale: 1, autoAlpha: 1, duration: .54, clearProps: "transform,opacity,visibility" }, .12)
    .fromTo(els.location.querySelector(".back-map"), { x: -26, autoAlpha: .08 }, { x: 0, autoAlpha: 1, duration: .4, clearProps: "transform,opacity,visibility" }, .2);
}

function stopAmbientMotion(timeline) {
  timeline?.kill?.();
  return null;
}

function startWorldAmbientMotion() {
  locationAmbientTimeline = stopAmbientMotion(locationAmbientTimeline);
  worldAmbientTimeline = stopAmbientMotion(worldAmbientTimeline);
  if (!window.gsap || reducedMotion() || els.world.hidden) return;
  const breezes = els.worldAmbient.querySelectorAll(".wind-breath");
  const cloudBands = els.worldAmbient.querySelectorAll(".world-cloud-band");
  const canopyShadows = els.worldAmbient.querySelectorAll(".canopy-shadow");
  gsap.set([...breezes, ...cloudBands], { autoAlpha: 0 });
  gsap.set(breezes, { skewX: -14 });
  worldAmbientTimeline = gsap.timeline({ repeat: -1, repeatDelay: .35, defaults: { ease: "sine.inOut" } })
    .fromTo(breezes, { xPercent: -20, autoAlpha: 0 }, { xPercent: 355, autoAlpha: .96, duration: 4.4, stagger: 1.35, ease: "power1.inOut" }, .8)
    .to(breezes, { autoAlpha: 0, duration: .55, stagger: 1.35 }, 4.15)
    .fromTo(cloudBands, { xPercent: -25, autoAlpha: 0 }, { xPercent: 380, autoAlpha: .34, duration: 11, stagger: 4.5, ease: "none" }, 0)
    .to(canopyShadows, { x: 26, rotation: 1.6, scaleX: 1.1, autoAlpha: .52, duration: 4.8, stagger: .7, yoyo: true, repeat: 1 }, 0);
}

function startLocationAmbientMotion() {
  worldAmbientTimeline = stopAmbientMotion(worldAmbientTimeline);
  locationAmbientTimeline = stopAmbientMotion(locationAmbientTimeline);
  if (!window.gsap || reducedMotion() || els.location.hidden) return;
  const foliage = els.locationAmbient.querySelector(".location-foliage-copy");
  const breezes = els.locationAmbient.querySelectorAll(".wind-breath");
  gsap.set(breezes, { autoAlpha: 0 });
  locationAmbientTimeline = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } })
    .to(foliage, { rotation: .58, x: 5, scale: 1.006, duration: 2.7 }, 0)
    .to(foliage, { rotation: -.42, x: -3.5, scale: 1.004, duration: 3.2 }, 2.7)
    .to(foliage, { rotation: 0, x: 0, scale: 1, duration: 2.5 }, 5.9)
    .fromTo(breezes, { xPercent: -20, autoAlpha: 0 }, { xPercent: 355, autoAlpha: .78, duration: 4.1, stagger: 1.45, ease: "power1.inOut" }, 1.2)
    .to(breezes, { autoAlpha: 0, duration: .45, stagger: 1.45 }, 4.95);
}

function openEvent(id) {
  const event = activeEvents().find(item => item.id === id);
  if (!event) { toast("这件事已经不在当前时间段了。"); return; }
  if (state.view !== "location" || state.location !== event.location) enterLocation(event.location, id);
  else { state.selectedEventId = id; showPet(eventPet(event), "idle"); renderLocationPanel(); }
}

function renderLocationPanel() {
  const location = LOCATIONS[state.location];
  const weather = WEATHER[state.weather] || WEATHER.clear;
  const petEvents = currentPetEventsAt(state.location);
  const localEvents = [...petEvents, ...publicEventsAt(state.location)];
  const selected = localEvents.find(event => event.id === state.selectedEventId);
  const operationalText = petEvents.length ? `${petEvents.length} 项待处理` : publicEventsAt(state.location).length ? "有山谷救助事项" : "运行正常";
  let html = `<button class="panel-grip" data-panel-toggle aria-label="展开地点管理面板" aria-expanded="false"><span></span></button><header class="panel-command"><div><p class="panel-label">${location.kicker}</p><h2>${location.name}</h2></div><span class="operational-status ${localEvents.length ? "attention" : ""}"><i></i>${operationalText}</span></header><p class="panel-lede">${location.hint}。时间会改变这里出现的人和事。<span class="panel-weather"><i style="--weather-color:${weather.color}"></i>${weather.label} · ${weather.impact}</span></p>`;
  if (localEvents.length) {
    html += `<div class="section-heading"><b>当前事件</b><span>${localEvents.length} 项</span></div><div class="event-list">${localEvents.map(event => eventRow(event)).join("")}</div>`;
  } else {
    html += `<div class="event-list"><div class="event-row empty"><span class="event-symbol"><svg aria-hidden="true"><use href="assets/sprites.svg#icon-note"></use></svg></span><span><b>此刻很安静</b><small>推进时间后再来看看</small></span></div></div>`;
  }
  if (selected) html += eventDetail(selected);
  html += mobileExplorationPanel();
  const locationActivities = activitiesAt(state.location);
  if (locationActivities.length) {
    html += `<div class="section-heading"><b>地点活动</b><span>每日可完成</span></div><div class="care-actions location-activities">${locationActivities.map(activity => {
      const done = activityDone(activity);
      const blocked = missingCost(activity.cost);
      const weatherBlocked = activityWeatherBlockedReason(activity, state.location);
      const reason = done ? "今日已完成" : weatherBlocked || (blocked ? `缺少${blocked}` : activity.note);
      const miniGame = resolveTaskMiniGame(activity.game, state.activePetId, activity.inspectMode, state.location, false, false, activity.id);
      const mode = miniGameModeLabel(miniGame.game, miniGame.inspectMode, state.activePetId);
      return `<button class="care-button" data-location-activity="${activity.id}" title="${reason} · 操作：${mode}" ${done || blocked || weatherBlocked ? "disabled" : ""}><svg aria-hidden="true"><use href="assets/sprites.svg#${location.icon}"></use></svg><span><b>${activity.label}</b><small>${reason}${done || blocked || weatherBlocked ? "" : ` · ${mode}`}</small></span></button>`;
    }).join("")}</div>`;
  }
  if (state.location === "home") html += homePanel();
  if (state.location === "rescue") html += rescuePanel();
  if (state.location === "market") html += marketPanel();
  els.locationPanel.innerHTML = html;
  installPanelHandlers();
  animatePanelContents();
  renderExplorationScenes();
}

function animatePanelContents() {
  if (!window.gsap || reducedMotion() || els.location.hidden || state.miniGameActive) return;
  const items = [...els.locationPanel.querySelectorAll(".event-row, .event-detail, .care-button, .panel-explore-card, .market-item, .adoption-item, .pet-profile, .routine-track")].slice(0, 12);
  if (!items.length) return;
  gsap.fromTo(items, { x: 28, y: 5, scale: .97, autoAlpha: .18 }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: .38, stagger: { each: .035, amount: .28 }, ease: "power3.out", clearProps: "transform,opacity,visibility" });
}

function eventRow(event) {
  const selected = state.selectedEventId === event.id;
  return `<button class="event-row ${selected ? "active" : ""}" data-event="${event.id}" aria-pressed="${selected}"><span class="event-symbol"><svg aria-hidden="true"><use href="assets/sprites.svg#${LOCATIONS[event.location].icon}"></use></svg></span><span><b>${event.title}</b><small>${formatTime(event.window[0])}–${formatTime(event.window[1])}</small></span><em>${event.label}</em></button>`;
}

function rewardLabels(reward = {}) {
  const labels = { coins: "金币", reputation: "口碑", food: "食物", medicine: "药品", toy: "玩具", treat: "零食", soap: "清洁用品", bedding: "柔软寝具", fish: "鲜鱼", carrot: "萝卜", trust: "信赖", mood: "心情", clean: "清洁", hunger: "饱腹", energy: "精力", health: "健康", growth: "成长", candidate: "待领养动物" };
  return Object.entries(reward).map(([key, value]) => `<span>${labels[key] || key} ${typeof value === "number" ? `+${value}` : ""}</span>`).join("");
}

function rewardSummary(reward = {}) {
  const labels = { coins: "金币", reputation: "口碑", food: "食物", medicine: "药品", toy: "玩具", treat: "零食", soap: "清洁用品", bedding: "柔软寝具", fish: "鲜鱼", carrot: "萝卜", trust: "信赖", mood: "心情", clean: "清洁", hunger: "饱腹", energy: "精力", health: "健康", comfort: "舒适", stress: "压力", growth: "成长" };
  return Object.entries(reward)
    .filter(([key, value]) => labels[key] && typeof value === "number" && value !== 0)
    .slice(0, 3)
    .map(([key, value]) => `${value > 0 ? "+" : ""}${value} ${labels[key]}`)
    .join(" · ");
}

function showCompletionFlourish(reward = {}, qualityLabel = "", meta = "") {
  clearTimeout(completionFlourishTimer);
  completionFlourishTimeline?.kill?.();
  completionFlourishTimeline = null;
  window.gsap?.killTweensOf?.([els.statusFloat, ...els.statusFloat.children]);
  els.statusFloat.innerHTML = `<strong>完成${qualityLabel ? ` · ${qualityLabel}` : ""}</strong><span>${rewardSummary(reward) || "伙伴状态已更新"}</span>${meta ? `<em class="flourish-meta">${meta}</em>` : ""}${Array.from({ length: 7 }, () => "<i></i>").join("")}`;
  const particles = [...els.statusFloat.querySelectorAll("i")];
  if (!window.gsap || reducedMotion()) {
    completionFlourishTimer = setTimeout(() => { els.statusFloat.innerHTML = ""; }, 1100);
    return;
  }
  const directions = [[-58,-34],[-28,-52],[0,-60],[31,-49],[58,-29],[-45,4],[46,7]];
  completionFlourishTimeline = gsap.timeline({ onComplete: () => { els.statusFloat.innerHTML = ""; completionFlourishTimeline = null; } })
    .fromTo(els.statusFloat, { y: 8, scale: .92, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: .28, ease: "power3.out" }, 0)
    .fromTo(els.statusFloat.querySelectorAll("strong, span, em"), { y: 5, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .26, stagger: .04, ease: "power3.out" }, .04)
    .fromTo(particles, { x: 0, y: 0, scale: .4, autoAlpha: 0 }, { x: index => directions[index][0], y: index => directions[index][1], scale: 1, autoAlpha: 1, duration: .38, stagger: .018, ease: "power3.out" }, .03)
    .to(particles, { y: "-=10", scale: .55, autoAlpha: 0, duration: .28, stagger: .012, ease: "power2.in" }, .38)
    .to(els.statusFloat, { y: -8, autoAlpha: 0, duration: .24, ease: "power2.in" }, .92);
}

function eventDetail(event) {
  const missing = missingCost(event.cost);
  const weatherReason = weatherBlockReason(event.location);
  const sleepReason = state.ownedPetIds.includes(eventPet(event)) && statsFor(eventPet(event)).asleep ? "先叫醒伙伴" : "";
  const blocked = weatherReason || sleepReason || (missing ? `缺少${missing}` : "");
  const miniGame = resolveTaskMiniGame(event.game, eventPet(event), event.inspectMode, event.location, event.id === "home-breakfast", false, event.id);
  const mode = miniGameModeLabel(miniGame.game, miniGame.inspectMode, eventPet(event));
  return `<div class="event-detail"><h3>${event.title}</h3><p>${event.detail}</p><div class="event-reward">${rewardLabels(event.reward)}</div><button class="primary-button" data-start-event="${event.id}" ${blocked ? "disabled" : ""} title="${blocked || event.detail}">${blocked || `开始 · ${mode}`}</button></div>`;
}

function homePanel() {
  const pet = petById(state.activePetId);
  const stats = statsFor(pet.id);
  const petRoutine = routineFor(pet.id);
  const favorite = HOME_ACTIONS[pet.favoriteAction]?.label || "自由活动";
  const companionOptions = state.ownedPetIds.filter(id => id !== pet.id && !statsFor(id).asleep).map(id => `<option value="${id}">${petById(id).name} · ${petById(id).type}</option>`).join("");
  const routine = routineSteps().map(step => `<span class="routine-step ${petRoutine[step.id] ? "done" : ""}"><i>${petRoutine[step.id] ? "✓" : ""}</i>${step.label}</span>`).join("");
  const sleepControls = stats.asleep
    ? `<div class="sleep-controls"><button class="primary-button" data-sleep-advance>继续睡 1 小时</button><button class="secondary-button" data-wake>轻声叫醒</button></div>`
    : `<button class="secondary-button sleep-action" data-sleep ${sleepBlockedReason(pet.id) ? "disabled" : ""} title="${sleepBlockedReason(pet.id) || "进入持续睡眠状态"}">${sleepBlockedReason(pet.id) || (state.minutes >= 1080 ? "准备夜间休息" : "安排一小时小睡")}</button>`;
  const modeControl = `<div class="home-mode" role="group" aria-label="家园模式"><button data-home-mode="life" aria-pressed="${state.homeMode !== "furnish"}">生活照料</button><button data-home-mode="furnish" aria-pressed="${state.homeMode === "furnish"}" ${stats.asleep ? "disabled" : ""} title="${stats.asleep ? "先叫醒伙伴再布置" : "进入布置模式"}">布置家具</button></div>`;
  if (state.homeMode === "furnish") {
    const selected = state.furniturePlaced[state.selectedFurnitureId] || {};
    return `${modeControl}<p class="furnish-note">拖动家具放到地面带，选中后可微调朝向和大小；下雨躲进室内时家具会一起留下。回到生活照料后，点家具就能让伙伴使用。</p><div class="section-heading"><b>已拥有家具</b><span>${state.furnitureOwned.length} 件</span></div><div class="furniture-list">${state.furnitureOwned.map(id => { const item = FURNITURE_CATALOG.find(entry => entry.id === id); return item ? `<button class="furniture-row ${state.selectedFurnitureId === id ? "selected" : ""}" data-focus-furniture="${id}"><img src="${item.asset}" alt="" /><span><b>${item.name}</b><small>${item.note} · ${furnitureFitLabel(item)}</small></span><em>${item.compatible.includes(pet.id) ? "可以互动" : "不适合当前伙伴"}</em></button>` : ""; }).join("")}</div><div class="furnish-tools" aria-label="家具微调"><span>当前：${FURNITURE_CATALOG.find(item => item.id === state.selectedFurnitureId)?.name || "未选择"}</span><small>旋转 ${Math.round(selected.rotation || 0)}° · 大小 ${Math.round((selected.scale || 1) * 100)}%</small><div><button type="button" data-furniture-adjust="rotate-left" aria-label="向左旋转家具">↺</button><button type="button" data-furniture-adjust="rotate-right" aria-label="向右旋转家具">↻</button><button type="button" data-furniture-adjust="scale-down" aria-label="缩小家具">−</button><button type="button" data-furniture-adjust="scale-up" aria-label="放大家具">＋</button></div><button type="button" class="furniture-reset" data-furniture-adjust="reset">恢复这件的朝向和大小</button></div>`;
  }
  return `
    ${modeControl}
    <div class="section-heading"><b>当前伙伴</b><span>${growthStage(stats)} · Lv.${growthLevel(stats)}</span></div>
    <div class="pet-profile"><div class="profile-head"><img src="${pet.image}" alt="${pet.name}" /><span><b>${pet.name} · ${pet.type}</b><small>${pet.temperament} · 喜欢${favorite}</small></span></div><div class="pet-traits"><span>${isPetActiveNow(pet) ? "当前很活跃" : `${formatTime(pet.activeWindow[0])} 后更活跃`}</span><span>喜欢${LOCATIONS[pet.favoriteLocation].name}</span><span>相伴第 ${stats.ageDays} 天</span></div><div class="growth-line"><span>成长 ${stats.growth % 80} / 80</span><div role="progressbar" aria-label="${pet.name}成长进度" aria-valuemin="0" aria-valuemax="80" aria-valuenow="${stats.growth % 80}"><i style="--growth:${(stats.growth % 80) / 80 * 100}%"></i></div></div><div class="stat-lines">${statLine("饱腹", stats.hunger, "#d1933a")}${statLine("清洁", stats.clean, "#4f8995")}${statLine("心情", stats.mood, "#b75349")}${statLine("精力", stats.energy, "#6d7db5")}${statLine("健康", stats.health, "#4e8757")}${statLine("舒适", stats.comfort, "#82765b")}${statLine("压力", stats.stress, "#a55b67", true)}</div></div>
    <div class="section-heading"><b>${pet.name}的今日生活</b><span>${routineDoneCount(pet.id)} / 5</span></div><div class="routine-track">${routine}</div>
    <div class="section-heading"><b>自由照料</b><span>亲手完成</span></div>
    <div class="care-actions">${Object.entries(HOME_ACTIONS).map(([id, action]) => { const reason = homeActionBlockedReason(id, pet.id) || (missingCost(action.cost) ? `缺少${missingCost(action.cost)}` : ""); const play = id === "play" ? homePlayPreview(pet.id) : null; return `<button class="care-button" data-home-action="${id}" ${reason ? "disabled" : ""} title="${reason || play?.instruction || action.note}"><svg aria-hidden="true"><use href="assets/sprites.svg#${action.icon}"></use></svg><span><b>${action.label}${id === pet.favoriteAction ? " · 偏爱" : ""}</b><small>${reason || (play ? play.mode : action.note)}</small></span></button>`; }).join("")}</div>
    ${!stats.asleep && companionOptions ? `<div class="companion-picker"><label for="companionSelect">邀请伙伴</label><select id="companionSelect">${companionOptions}</select><button class="secondary-button" data-companion>确认邀请</button></div>` : ""}
    ${sleepControls}`;
}

function homeActionBlockedReason(id, petId = state.activePetId) {
  const stats = statsFor(petId);
  if (stats.asleep) return "正在睡觉";
  if (id === "feed" && stats.hunger >= 86) return "已经吃饱，稍后再喂";
  if (id === "treat" && stats.hunger >= 94) return "今天不再需要零食";
  if (id === "bath" && stats.clean >= 92) return "毛发已经很干净";
  if (id === "play" && stats.energy < 12) return "精力太低，需要先休息";
  return "";
}

function sleepBlockedReason(petId = state.activePetId) {
  const stats = statsFor(petId);
  if (stats.asleep) return "";
  if (stats.energy >= 78 && state.minutes < 1080) return "精力很好，先活动一下";
  return "";
}

function statLine(label, value, color, inverse = false) {
  return `<div class="stat-line ${inverse ? "inverse" : ""}"><span>${label}</span><div class="stat-track" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><div class="stat-fill" style="--value:${value}%;--stat-color:${color}"></div></div><b>${value}</b></div>`;
}

function furnitureScenePosition(id) {
  const stored = { x: 50, y: 76, scale: 1, rotation: 0, layer: 76, ...(state.furniturePlaced[id] || {}) };
  if (window.innerWidth > 640) return stored;
  const x = id === "starter-bed" ? clamp(32 + (stored.x - 10) * .45, 32, 68) : clamp(stored.x, 14, 86);
  return { ...stored, x, y: clamp(29 + (stored.y - 48) * .23, 29, 39) };
}

function furniturePlacementBounds(id, y) {
  const floorY = clamp(y, 48, 88);
  const isBed = id === "starter-bed";
  const halfWidth = isBed ? 18 : 7;
  const scale = clamp(.88 + (floorY - 48) / 40 * .22, .88, 1.1);
  return { xMin: halfWidth + 2, xMax: 100 - halfWidth - 2, yMin: 48, yMax: 88, scale };
}

function furnitureTransform(position) {
  return `translate(-50%, -50%) rotate(${position.rotation || 0}deg) scale(${position.scale || 1})`;
}

function renderHomeFurnishings() {
  const visible = state.view === "location" && state.location === "home";
  els.furnishings.hidden = !visible;
  if (!visible) { els.furnishings.innerHTML = ""; return; }
  els.furnishings.classList.toggle("editing", state.homeMode === "furnish");
  els.furnishings.innerHTML = state.furnitureOwned.map(id => {
    const item = FURNITURE_CATALOG.find(entry => entry.id === id);
    if (id === "starter-bed" && statsFor(state.activePetId).asleep) return "";
    const position = furnitureScenePosition(id);
    return item ? `<button class="placed-furniture${state.homeMode === "furnish" && state.selectedFurnitureId === id ? " is-selected" : ""}" data-furniture="${id}" style="left:${position.x}%;top:${position.y}%;z-index:${Math.round(position.layer || position.y)};transform:${furnitureTransform(position)}" aria-label="${state.homeMode === "furnish" ? `拖动${item.name}调整位置` : `让${petById(state.activePetId).name}与${item.name}互动`}"><img src="${item.asset}" alt="${item.name}" draggable="false" /><span>${item.name}</span></button>` : "";
  }).join("");
  els.furnishings.querySelectorAll("[data-furniture]").forEach(element => installFurnitureInteraction(element));
}

function installFurnitureInteraction(element) {
  let dragging = false;
  let moved = false;
  let start = null;
  element.addEventListener("pointerdown", event => {
    if (state.homeMode !== "furnish") return;
    state.selectedFurnitureId = element.dataset.furniture;
    dragging = true;
    moved = false;
    start = { x: event.clientX, y: event.clientY };
    element.setPointerCapture?.(event.pointerId);
  });
  element.addEventListener("pointermove", event => {
    if (!dragging || !start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    moved ||= Math.hypot(dx, dy) > 5;
    const live = { scale: 1, rotation: 0, ...(state.furniturePlaced[element.dataset.furniture] || {}) };
    element.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(${live.rotation || 0}deg) scale(${live.scale || 1})`;
  });
  const finish = event => {
    if (!dragging || !start) return;
    dragging = false;
    element.releasePointerCapture?.(event.pointerId);
    if (!moved) {
      element.style.transform = furnitureTransform(furnitureScenePosition(element.dataset.furniture));
      return;
    }
    const area = els.furnishings.getBoundingClientRect();
    const current = { x: 50, y: 76, scale: 1, rotation: 0, ...(state.furniturePlaced[element.dataset.furniture] || {}) };
    const bounds = furniturePlacementBounds(element.dataset.furniture, current.y + (event.clientY - start.y) / Math.max(1, area.height) * 100);
    const nextY = clamp(current.y + (event.clientY - start.y) / Math.max(1, area.height) * 100, bounds.yMin, bounds.yMax);
    state.furniturePlaced[element.dataset.furniture] = {
      ...current,
      x: clamp(current.x + (event.clientX - start.x) / Math.max(1, area.width) * 100, bounds.xMin, bounds.xMax),
      y: nextY,
      scale: clamp(current.scale || bounds.scale, .78, 1.24),
      layer: nextY
    };
    element.style.transform = "";
    saveState();
    renderHomeFurnishings();
  };
  element.addEventListener("pointerup", finish);
  element.addEventListener("pointercancel", finish);
  element.addEventListener("click", () => {
    state.selectedFurnitureId = element.dataset.furniture;
    if (moved) return;
    if (state.homeMode === "furnish") {
      renderHomeFurnishings();
      renderLocationPanel();
      return;
    }
    interactWithFurniture(element.dataset.furniture);
  });
}

function focusFurniture(id) {
  state.selectedFurnitureId = id;
  els.furnishings.querySelectorAll("[data-furniture]").forEach(el => el.classList.toggle("is-selected", el.dataset.furniture === id));
  const element = els.furnishings.querySelector(`[data-furniture="${id}"]`);
  element?.focus({ preventScroll: true });
  const img = element?.querySelector("img");
  if (img && window.gsap && !reducedMotion()) gsap.fromTo(img, { scale: 1 }, { scale: 1.08, duration: .22, yoyo: true, repeat: 1, ease: "power2.out" });
  renderLocationPanel();
}

function adjustSelectedFurniture(kind) {
  const id = state.selectedFurnitureId || state.furnitureOwned[0];
  if (!id) return;
  const current = { x: 50, y: 76, scale: 1, rotation: 0, ...(state.furniturePlaced[id] || {}) };
  if (kind === "rotate-left") current.rotation = (current.rotation - 15 + 360) % 360;
  if (kind === "rotate-right") current.rotation = (current.rotation + 15) % 360;
  if (kind === "scale-down") current.scale = clamp(current.scale - .08, .78, 1.24);
  if (kind === "scale-up") current.scale = clamp(current.scale + .08, .78, 1.24);
  if (kind === "reset") { current.rotation = 0; current.scale = 1; }
  state.furniturePlaced[id] = current;
  saveState(); renderHomeFurnishings(); renderLocationPanel();
}

function furnitureClock() {
  return state.day * 1440 + state.minutes;
}

function interactWithFurniture(id) {
  const item = FURNITURE_CATALOG.find(entry => entry.id === id);
  const pet = petById(state.activePetId);
  const stats = statsFor(pet.id);
  if (!item) return;
  if (state.homeMode === "furnish") return;
  if (stats.asleep) { toast(`先轻声叫醒${pet.name}。`); return; }
  if (!item.compatible.includes(pet.id)) { toast(`${pet.name}看了看${item.name}，这件家具不适合它使用。`); speak(`${pet.name}围着${item.name}转了一圈，然后把鼻子伸向更适合自己的角落。`); return; }
  if (id === "starter-bed") { startSleep(); return; }
  state.furnitureUsedAt ||= {};
  const usedKey = `${pet.id}:${id}`;
  if ((state.furnitureUsedAt[usedKey] || 0) + 40 > furnitureClock()) {
    toast(`${pet.name}刚刚用过${item.name}，先做点别的吧。`);
    speak(`${pet.name}在${item.name}旁边嗅了嗅，暂时不想再玩了。`);
    return;
  }
  state.furnitureUsedAt[usedKey] = furnitureClock();
  const rewards = {
    "woven-rug": { mood: 5, comfort: 6, stress: -3, trust: 1 },
    "cat-post": { mood: 6, clean: -2, energy: -3, trust: 2 },
    "rabbit-tunnel": { mood: 7, energy: -5, trust: 2 },
    "toy-basket": { mood: 7, energy: -6, trust: 2 }
  };
  applyReward(rewards[id] || { mood: 4, trust: 1 }, pet.id);
  if (id === "toy-basket") markRoutine("bond", pet.id);
  playFurnitureScene(id, pet);
  renderLocationPanel();
  saveState();
}

function playFurnitureScene(id, pet) {
  const position = furnitureScenePosition(id);
  const action = id === "toy-basket" || id === "cat-post" ? "play" : "affection";
  const lines = {
    "cat-post": `${pet.name}伸长身体，认真磨了几下爪。`,
    "rabbit-tunnel": `${pet.name}钻进隧道，又从另一端探出头。`,
    "toy-basket": `${pet.name}从篮子里找到了自己的${PET_PLAY_CONFIG[pet.id].label}。`,
    "woven-rug": `${pet.name}在地毯上找了个舒服的位置趴下。`
  };
  showPet(pet.id, action);
  playFoley(id === "cat-post" ? "scratch" : id === "rabbit-tunnel" ? "rustle" : id === "toy-basket" ? "ball" : "settle");
  speak(lines[id] || `${pet.name}在${FURNITURE_CATALOG.find(item => item.id === id)?.name || "家具"}旁停了一会儿。`);
  const piece = els.furnishings.querySelector(`[data-furniture="${id}"]`);
  piece?.classList.add("is-in-use");
  if (id === "toy-basket") spawnFurnitureToy(pet.id, position);
  const finishUse = () => {
    piece?.classList.remove("is-in-use");
    if (window.gsap) gsap.set(els.petSprite, { clearProps: "transform,opacity,visibility" });
    if (!state.miniGameActive && state.view === "location" && !statsFor(pet.id).asleep) showPet(pet.id, "idle");
  };
  if (!window.gsap || reducedMotion() || els.location.hidden) {
    setTimeout(finishUse, 1800);
    return;
  }
  const scene = els.location.getBoundingClientRect();
  const px = (position.x - 49) / 100 * scene.width * .42;
  const py = (position.y - 78) / 100 * scene.height * .22;
  gsap.killTweensOf(els.petSprite);
  const timeline = gsap.timeline({ onComplete: finishUse });
  timeline.to(els.petSprite, { x: px, y: py, duration: .42, ease: "power2.out" });
  if (id === "rabbit-tunnel") {
    timeline.to(els.petSprite, { scale: .32, autoAlpha: .12, duration: .26 })
      .to(els.petSprite, { x: px + 46, duration: .18 })
      .to(els.petSprite, { scale: 1, autoAlpha: 1, duration: .3 });
  } else if (id === "cat-post") {
    timeline.to(els.petSprite, { rotation: -8, y: py - 10, duration: .16, yoyo: true, repeat: 3 });
  } else if (id === "woven-rug") {
    timeline.to(els.petSprite, { y: py + 14, scaleY: .92, duration: .4 });
  } else {
    timeline.to(els.petSprite, { y: py - 14, rotation: 6, duration: .2, yoyo: true, repeat: 2 });
  }
  timeline.to(els.petSprite, { x: 0, y: 0, rotation: 0, scale: 1, scaleY: 1, autoAlpha: 1, duration: .42, ease: "power2.inOut" }, "+=.28");
}

function spawnFurnitureToy(petId, position) {
  const config = PET_PLAY_CONFIG[petId];
  if (!config || !els.furnishings) return;
  els.furnishings.querySelectorAll(".furniture-toy-pop").forEach(node => node.remove());
  const toy = document.createElement("img");
  toy.className = "furniture-toy-pop";
  toy.src = config.asset;
  toy.alt = "";
  toy.style.left = `${position.x}%`;
  toy.style.top = `${Math.max(18, position.y - 16)}%`;
  els.furnishings.append(toy);
  if (window.gsap && !reducedMotion()) {
    gsap.fromTo(toy, { y: 18, scale: .4, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: .32, ease: "back.out(1.6)" });
    gsap.to(toy, { y: -14, autoAlpha: 0, duration: .36, delay: 1.35, onComplete: () => toy.remove() });
  } else setTimeout(() => toy.remove(), 1800);
}

function rescuePanel() {
  const candidates = state.candidates.map(petById).filter(Boolean);
  return `<div class="section-heading"><b>等待领养</b><span>${candidates.length} 位</span></div><div class="adoption-list">${candidates.length ? candidates.map(pet => { const blocked = adoptionBlockedReason(pet); return `<div class="adoption-item"><img src="${pet.image}" alt="${pet.name}" /><span><b>${pet.name} · ${pet.type}</b><small>${pet.temperament} · ${formatTime(pet.activeWindow[0])} 活跃 · 口碑 ${pet.adoptRep}</small></span><button class="market-button" data-adopt="${pet.id}" ${blocked ? "disabled" : ""}>${blocked || "领养"}</button></div>`; }).join("") : `<div class="panel-empty"><b>暂时没有等待领养的动物</b><p>完成山谷里的救助事件后，它们会来到这里等待新家。</p></div>`}</div>`;
}

function marketPanel() {
  const animals = PETS.filter(pet => pet.price > 0 && !state.ownedPetIds.includes(pet.id));
  return `
    <div class="section-heading"><b>生活补给</b><span>背包 ${backpackUsed()} / ${state.backpackCapacity}</span></div><div class="market-list">${MARKET_STOCK.map(item => { const blocked = stockBlockedReason(item); return `<div class="market-item"><span class="event-symbol"><svg aria-hidden="true"><use href="assets/sprites.svg#${item.icon}"></use></svg></span><span><b>${item.name}</b><small>${item.note}</small></span><button class="market-button" data-buy-stock="${item.id}" ${blocked ? "disabled" : ""}>${blocked || `${item.price} 金币`}</button></div>`; }).join("")}</div>
    <div class="section-heading"><b>伙伴登记</b><span>购买后直接入住</span></div><div class="market-list">${animals.length ? animals.map(pet => { const blocked = petPurchaseBlockedReason(pet); return `<div class="market-item"><img src="${pet.image}" alt="${pet.name}" /><span><b>${pet.name} · ${pet.type}</b><small>${pet.temperament} · ${formatTime(pet.activeWindow[0])} 活跃</small></span><button class="market-button" data-buy-pet="${pet.id}" ${blocked ? "disabled" : ""}>${blocked || `${pet.price} 金币`}</button></div>`; }).join("") : `<div class="panel-empty"><b>今日登记已经完成</b><p>新的伙伴会在之后的集市日出现。</p></div>`}</div>
    <div class="section-heading"><b>家园家具</b><span>已拥有 ${state.furnitureOwned.length} 件</span></div><div class="market-list">${FURNITURE_CATALOG.filter(item => item.price > 0).map(item => { const owned = state.furnitureOwned.includes(item.id); const blocked = owned ? "已经持有" : state.coins < item.price ? "金币不足" : ""; return `<div class="market-item furniture-market"><img src="${item.asset}" alt="${item.name}" /><span><b>${item.name}</b><small>${item.note} · ${furnitureFitLabel(item)}</small></span><button class="market-button" data-buy-furniture="${item.id}" ${blocked ? "disabled" : ""}>${blocked || `${item.price} 金币`}</button></div>`; }).join("")}</div>${state.pendingFurnishId ? `<button class="secondary-button" data-go-home-furnish>回家布置刚买的家具</button>` : ""}
    <div class="section-heading"><b>扩建住所</b><span>当前 ${state.capacity} 个位置</span></div><button class="secondary-button" data-upgrade-home ${state.coins < capacityCost() || state.capacity >= 6 ? "disabled" : ""}>${state.capacity >= 6 ? "住所已全部扩建" : `增加 1 个位置 · ${capacityCost()} 金币`}</button>
    <div class="section-heading"><b>背包扩容</b><span>当前 ${state.backpackCapacity} 格</span></div><button class="secondary-button" data-upgrade-backpack ${state.coins < backpackUpgradeCost() || state.backpackCapacity >= 48 ? "disabled" : ""}>${state.backpackCapacity >= 48 ? "背包已经扩到最大" : `增加 6 格 · ${backpackUpgradeCost()} 金币`}</button>`;
}

function installPanelHandlers() {
  els.locationPanel.querySelectorAll("[data-event]").forEach(button => button.addEventListener("click", () => { state.selectedEventId = button.dataset.event; const event = allEvents().find(item => item.id === button.dataset.event); showPet(eventPet(event), "idle"); renderLocationPanel(); }));
  els.locationPanel.querySelectorAll("[data-start-event]").forEach(button => button.addEventListener("click", () => startEvent(button.dataset.startEvent)));
  els.locationPanel.querySelectorAll("[data-location-activity]").forEach(button => button.addEventListener("click", () => startLocationActivity(button.dataset.locationActivity)));
  els.locationPanel.querySelectorAll("[data-panel-explore-game]").forEach(button => button.addEventListener("click", () => startExplorationGame(button.dataset.panelExploreGame)));
  els.locationPanel.querySelectorAll("[data-home-action]").forEach(button => button.addEventListener("click", () => startHomeAction(button.dataset.homeAction)));
  els.locationPanel.querySelectorAll("[data-adopt]").forEach(button => button.addEventListener("click", () => adoptPet(button.dataset.adopt)));
  els.locationPanel.querySelectorAll("[data-buy-stock]").forEach(button => button.addEventListener("click", () => buyStock(button.dataset.buyStock)));
  els.locationPanel.querySelectorAll("[data-buy-pet]").forEach(button => button.addEventListener("click", () => buyPet(button.dataset.buyPet)));
  els.locationPanel.querySelectorAll("[data-buy-furniture]").forEach(button => button.addEventListener("click", () => buyFurniture(button.dataset.buyFurniture)));
  els.locationPanel.querySelectorAll("[data-home-mode]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.homeMode === "furnish" && statsFor(state.activePetId).asleep) { toast("先叫醒伙伴，再布置家具。"); return; }
    state.homeMode = button.dataset.homeMode;
    renderLocationPanel();
    renderHomeFurnishings();
    saveState();
  }));
  els.locationPanel.querySelectorAll("[data-focus-furniture]").forEach(button => button.addEventListener("click", () => focusFurniture(button.dataset.focusFurniture)));
  els.locationPanel.querySelectorAll("[data-furniture-adjust]").forEach(button => button.addEventListener("click", () => adjustSelectedFurniture(button.dataset.furnitureAdjust)));
  els.locationPanel.querySelector("[data-go-home-furnish]")?.addEventListener("click", () => enterLocation("home"));
  els.locationPanel.querySelector("[data-upgrade-home]")?.addEventListener("click", upgradeHome);
  els.locationPanel.querySelector("[data-upgrade-backpack]")?.addEventListener("click", upgradeBackpack);
  els.locationPanel.querySelector("[data-companion]")?.addEventListener("click", inviteCompanion);
  els.locationPanel.querySelector("[data-sleep]")?.addEventListener("click", startSleep);
  els.locationPanel.querySelector("[data-sleep-advance]")?.addEventListener("click", () => advanceTime(60));
  els.locationPanel.querySelector("[data-wake]")?.addEventListener("click", wakePet);
  els.locationPanel.querySelector("[data-panel-toggle]")?.addEventListener("click", toggleLocationPanel);
}

function toggleLocationPanel() {
  const expanded = els.locationPanel.classList.toggle("expanded");
  const toggle = els.locationPanel.querySelector("[data-panel-toggle]");
  toggle?.setAttribute("aria-expanded", String(expanded));
  toggle?.setAttribute("aria-label", expanded ? "收起地点管理面板" : "展开地点管理面板");
  if (window.gsap && !reducedMotion()) {
    gsap.fromTo(els.locationPanel, { y: expanded ? 24 : -10, scale: expanded ? .975 : 1.01 }, { y: 0, scale: 1, duration: .38, ease: "power3.out", clearProps: "transform" });
  }
}

function inviteCompanion() {
  const companionId = els.locationPanel.querySelector("#companionSelect")?.value;
  if (!companionId || state.location !== "home" || state.miniGameActive) return;
  if (statsFor(state.activePetId).asleep) { toast(`先叫醒${petById(state.activePetId).name}，再邀请同伴。`); return; }
  clearTimeout(companionTimeout);
  const activePetId = state.activePetId;
  const activePet = petById(activePetId);
  const companion = petById(companionId);
  els.companionSprite.hidden = false;
  els.companionSprite.src = petFramePath(companionId, "affection", 0);
  els.companionSprite.alt = `${companion.name}正在靠近${activePet.name}`;
  showPet(activePetId, "affection");
  speak(`${companion.name}慢慢靠近，${activePet.name}先闻了闻它的鼻尖。`);
  applyReward({ mood: 5, trust: 2 }, activePetId);
  applyReward({ mood: 5, trust: 2 }, companionId);
  markRoutine("bond", activePetId);
  markRoutine("bond", companionId);
  saveState();
  playPetVoice(companionId, "soft");
  setTimeout(() => playPetVoice(activePetId, "happy"), 420);
  if (window.gsap && !reducedMotion()) {
    gsap.killTweensOf([els.companionSprite, els.petSprite]);
    const timeline = gsap.timeline();
    timeline.fromTo(els.companionSprite, { x: -130, opacity: 0 }, { x: 0, opacity: 1, duration: .55, ease: "power3.out" })
      .to(els.companionSprite, { x: 35, duration: .55, ease: "power2.inOut" })
      .to(els.petSprite, { x: -22, duration: .55, ease: "power2.inOut" }, "<")
      .to([els.companionSprite, els.petSprite], { y: -10, duration: .2, yoyo: true, repeat: 1, ease: "power2.out" });
  }
  companionTimeout = setTimeout(() => {
    if (window.gsap) gsap.to(els.companionSprite, { x: -80, opacity: 0, duration: .35, onComplete: () => { els.companionSprite.hidden = true; gsap.set(els.companionSprite, { clearProps: "all" }); } });
    else els.companionSprite.hidden = true;
    showPet(state.activePetId, "idle");
    renderLocationPanel();
  }, 4600);
}

function startSleep() {
  const stats = statsFor(state.activePetId);
  if (stats.asleep || state.location !== "home") return;
  const blocked = sleepBlockedReason();
  if (blocked) { toast(blocked); speak(`${petById(state.activePetId).name}现在还不困，想先活动一会儿。`); return; }
  clearTimeout(companionTimeout);
  if (window.gsap) gsap.killTweensOf(els.companionSprite);
  els.companionSprite.hidden = true;
  stats.asleep = true;
  renderHomeFurnishings();
  showPet(state.activePetId, "sleep");
  renderSleepState();
  renderLocationPanel();
  speak(`${petById(state.activePetId).name}在熟悉的寝具旁慢慢蜷了下来。`);
  playFoley("settle");
  startSnoreLoop();
  saveState();
}

function wakePet() {
  const stats = statsFor(state.activePetId);
  if (!stats.asleep) return;
  stats.asleep = false;
  stopSnoreLoop();
  renderHomeFurnishings();
  if (stats.sleepMinutes >= 120) markRoutine("sleep", state.activePetId);
  showPet(state.activePetId, "affection");
  renderSleepState();
  renderLocationPanel();
  speak(stats.sleepMinutes >= 120 ? "睡得很踏实，醒来后精神好多了。" : "只是打了个短盹，还需要更完整的休息。" );
  playPetVoice(state.activePetId, "happy");
  saveState();
}

function markRoutine(id, petId = state.activePetId) {
  const routine = routineFor(petId);
  if (!Object.hasOwn(routine, id) || routine[id]) return;
  routine[id] = true;
  checkRoutineBonus(petId);
}

function checkRoutineBonus(petId = state.activePetId) {
  const routine = routineFor(petId);
  if (routine.bonus || routineDoneCount(petId) < routineSteps().length) return;
  routine.bonus = true;
  statsFor(petId).growth += 12;
  grantManagementReward({ coins: 30, reputation: 4 });
  toast(`${petById(petId).name}完成完整日程：金币 +30，口碑 +4，成长 +12。` );
  playFoley("success");
}

function missingCost(cost) {
  if (!cost) return "";
  const names = { food: "食物", medicine: "药品", toy: "玩具", treat: "零食", soap: "清洁用品", bedding: "寝具" };
  const missing = Object.entries(cost).find(([key, amount]) => (state.inventory[key] || 0) < amount);
  return missing ? names[missing[0]] : "";
}

function spendCost(cost) { if (cost) Object.entries(cost).forEach(([key, amount]) => { state.inventory[key] = Math.max(0, (state.inventory[key] || 0) - amount); }); }
function stockPurchaseBlocked(item) {
  if (state.coins < item.price) return true;
  if (item.unique && (state.inventory[item.id] || 0) > 0) return true;
  return backpackSpace() < item.amount;
}
function stockBlockedReason(item) {
  if (item.unique && (state.inventory[item.id] || 0) > 0) return "已经持有";
  if (state.coins < item.price) return "金币不足";
  if (backpackSpace() < item.amount) return "背包已满";
  return "";
}
function adoptionBlockedReason(pet) {
  if (state.ownedPetIds.length >= state.capacity) return "住所已满";
  if (state.reputation < pet.adoptRep) return "口碑不足";
  return "";
}
function petPurchaseBlockedReason(pet) {
  if (state.ownedPetIds.length >= state.capacity) return "住所已满";
  if (state.coins < pet.price) return "金币不足";
  return "";
}

function startEvent(id) {
  const event = activeEvents().find(item => item.id === id);
  if (!event) return;
  const weatherReason = weatherBlockReason(event.location);
  if (weatherReason) { toast(weatherReason); return; }
  if (state.ownedPetIds.includes(eventPet(event)) && statsFor(eventPet(event)).asleep) { toast("参与事件前需要先叫醒它。" ); return; }
  const missing = missingCost(event.cost);
  if (missing) { toast(`需要先准备${missing}。`); return; }
  spendCost(event.cost);
  state.pendingMinigameCost = event.cost ? { ...event.cost } : null;
  const petId = eventPet(event);
  const miniGame = resolveTaskMiniGame(event.game, petId, event.inspectMode, event.location, event.id === "home-breakfast", false, event.id);
  activeGameContext = { type: "event", event, petId };
  launchMiniGame(miniGame.game, petId, event.title, miniGame.instruction || event.detail, miniGame.inspectMode);
}

function startLocationActivity(id) {
  const activity = activitiesAt(state.location).find(item => item.id === id);
  if (!activity || activityDone(activity)) return;
  const weatherReason = activityWeatherBlockedReason(activity, state.location);
  if (weatherReason) { toast(weatherReason); return; }
  if (!currentPetMatches(activity)) {
    const names = activity.requiredPets.map(requiredId => petById(requiredId).name).join("或");
    toast(`请先在伙伴栏选择${names}。`);
    return;
  }
  if (statsFor(state.activePetId).asleep) { toast("开始活动前需要先叫醒它。"); return; }
  const missing = missingCost(activity.cost);
  if (missing) { toast(`需要先准备${missing}。`); return; }
  spendCost(activity.cost);
  state.pendingMinigameCost = activity.cost ? { ...activity.cost } : null;
  const petId = state.activePetId;
  const miniGame = resolveTaskMiniGame(activity.game, petId, activity.inspectMode, state.location, false, false, activity.id);
  activeGameContext = { type: "activity", activity, reward: activity.reward, location: state.location, petId };
  launchMiniGame(miniGame.game, petId, activity.label, miniGame.instruction || activity.note, miniGame.inspectMode);
}

function startHomeAction(id) {
  const action = HOME_ACTIONS[id];
  if (!action) return;
  const blocked = homeActionBlockedReason(id);
  if (blocked) { toast(blocked); return; }
  const missing = missingCost(action.cost);
  if (missing) { toast(`需要先去集市补充${missing}。`); return; }
  spendCost(action.cost);
  state.pendingMinigameCost = action.cost ? { ...action.cost } : null;
  const petId = state.activePetId;
  activeGameContext = { type: "home", id, reward: action.reward, petId };
  const miniGame = id === "play" ? homePlayPreview(petId) : { game: action.game, inspectMode: "", instruction: action.note };
  launchMiniGame(miniGame.game, petId, id === "play" ? `${action.label} · ${miniGame.mode}` : action.label, miniGame.instruction || action.note, miniGame.inspectMode);
}

/** 共享机制的伙伴专属名字，避免 HUD 上出现和实际规则不符的通用标签。 */
const PET_MODE_LABELS = Object.freeze({
  "choice:rabbit": "草径抉择",
  "trace:fox": "足迹描摹",
  "inspect:scan:fox": "痕迹侦查",
  "perch:cockatiel": "栖木摆位",
  "match3:hamster": "囤粮配对",
  "sort:budgie": "谷粒分拣"
});

function miniGameModeLabel(game, inspectMode = "", petId = "") {
  const petLabel = petId ? PET_MODE_LABELS[`${game}${game === "inspect" ? `:${inspectMode || "scan"}` : ""}:${petId}`] : "";
  if (petLabel) return petLabel;
  if (game === "inspect") return ({ scent: "气味追踪", listening: "听声辨位", watch: "环境观察", scan: "现场扫描" })[inspectMode || "scan"] || "现场扫描";
  return ({ drag: "食物投放", play: "目标追逐", pounce: "伏击时机", flight: "低空飞行", fishing: "浮漂收杆", carrot: "节奏采收", throw: "力度召回", bubbles: "环境清理", stroke: "互动照料", burrow: "地道寻粮", memory: "影子记忆", match3: "三消整理", trail: "高地路线", choice: "情境决策", sort: "物资分拣", forage: "草叶取舍", stash: "颊囊囤粮", song: "音阶跟唱", timing: "信号时机", trace: "足迹描摹", perch: "栖木摆位" })[game] || "伙伴互动";
}

const MINI_GAME_MECHANICS = Object.freeze([
  ["drag", "拖放命中"], ["play", "目标路线"], ["pounce", "时机窗口"], ["flight", "连续引导"],
  ["fishing", "等待收杆"], ["carrot", "节拍交替"], ["throw", "力度区间"], ["burrow", "网格避障"],
  ["memory", "序列回忆"], ["match3", "交换三消"], ["trail", "路径规划"], ["timing", "节拍校准"],
  ["inspect:scent", "连续追踪"], ["inspect:listening", "方向判断"], ["inspect:watch", "移动观察"], ["inspect:scan", "扫描发现"],
  ["bubbles", "工具路线"], ["stroke", "连续手势"], ["choice", "情境决策"], ["sort", "分类决策"],
  ["forage", "取舍筛选"], ["stash", "容量分配"], ["song", "音高轨道"],
  ["trace", "足迹描摹"], ["perch", "栖木摆位"]
]);

function miniGameMechanicAudit() {
  const labels = MINI_GAME_MECHANICS.map(([, label]) => label);
  const seen = new Set();
  const duplicates = labels.filter(label => seen.has(label) || !seen.add(label));
  return { total: MINI_GAME_MECHANICS.length, unique: new Set(labels).size, duplicates, entries: MINI_GAME_MECHANICS.map(([key, label]) => ({ key, label })) };
}

function miniGameContentAudit() {
  const collect = (entries, resolve) => {
    const signatures = entries.map(resolve);
    const counts = signatures.reduce((map, signature) => map.set(signature, (map.get(signature) || 0) + 1), new Map());
    return {
      total: signatures.length,
      unique: new Set(signatures).size,
      duplicates: [...counts.entries()].filter(([, count]) => count > 1).map(([signature, count]) => ({ signature, count })),
      entries: entries.map((entry, index) => ({ id: entry.id, signature: signatures[index] }))
    };
  };
  const exploration = Object.entries(EXPLORATION_GAMES).flatMap(([location, games]) => games.map(game => ({ ...game, location })));
  const activities = Object.entries(LOCATION_ACTIVITIES).flatMap(([location, games]) => games.map(game => ({ ...game, location })));
  const events = [...EVENT_TEMPLATES, ...RANDOM_EVENT_TEMPLATES, ...WEATHER_EVENT_TEMPLATES].map(event => ({ ...event, location: event.location, source: event.weather ? "weather" : event.id.startsWith("chance-") ? "random" : "event" }));
  const signatureFor = entry => {
    const resolved = resolveTaskMiniGame(entry.game, state.activePetId, entry.inspectMode || "", entry.location, false, false, entry.id, false);
    return `${entry.location}:${resolved.game}:${resolved.inspectMode || "direct"}`;
  };
  const eventSignatureFor = entry => {
    const petId = entry.pet && entry.pet !== "active" ? entry.pet : state.activePetId;
    const resolved = resolveTaskMiniGame(entry.game, petId, entry.inspectMode || "", entry.location, entry.id === "home-breakfast", false, entry.id, false);
    return `${entry.location}:${resolved.game}:${resolved.inspectMode || "direct"}`;
  };
  const allEntries = [...exploration, ...activities, ...events];
  const allSignatures = allEntries.map(entry => entry.source ? eventSignatureFor(entry) : signatureFor(entry));
  const allCounts = allSignatures.reduce((map, signature) => map.set(signature, (map.get(signature) || 0) + 1), new Map());
  return {
    exploration: collect(exploration, signatureFor),
    activities: collect(activities, signatureFor),
    events: collect(events, eventSignatureFor),
    global: {
      total: allSignatures.length,
      unique: new Set(allSignatures).size,
      duplicates: [...allCounts.entries()].filter(([, count]) => count > 1).map(([signature, count]) => ({ signature, count }))
    }
  };
}

function resolvePetMiniGame(game, petId, inspectMode = "", locationId = state.location) {
  // Calls without a location are used as a generic capability query; keep their stable scent mode.
  if (arguments.length < 4) locationId = "meadow";
  if (game !== "inspect" || (inspectMode && inspectMode !== "scan")) return { game, inspectMode, instruction: "" };
  const profiles = {
    // 梳理是云朵的招牌互动，奶糖在室内也改用鼻子，避免两只犬玩到同一个游戏。
    dog: {
      game: "inspect",
      inspectMode: "scent",
      instruction: ["home", "clinic"].includes(locationId) ? "在室内也让奶糖用鼻子确认，按顺序点亮每个气味标记。" : "按住气味标记，带着奶糖沿连续路线追踪线索。"
    },
    cat: { game: locationId === "lakeside" ? "fishing" : "pounce", inspectMode: "", instruction: locationId === "lakeside" ? "观察浮漂，在鱼儿咬钩的瞬间收杆。" : "观察羽毛玩具穿过亮区，在正确时机发出扑击指令。" },
    rabbit: { game: "carrot", inspectMode: "", instruction: "跟着左右节奏帮助团子松开泥土，完成一轮蹬腿采收。" },
    hamster: { game: "burrow", inspectMode: "", instruction: "用方向键或滑动控制布丁穿过地道，绕开堵塞并收集三颗籽粮。" },
    poodle: { game: "stroke", inspectMode: "", instruction: "顺着毛发生长方向连续梳理，让云朵保持舒适和整洁。" },
    fox: { game: "throw", inspectMode: "", instruction: "看准力度抛出松果，让栗子完成三次安全回收。" },
    budgie: { game: "flight", inspectMode: "", instruction: "按住场景引导青豆飞行，依次穿过三道召回环。" },
    cockatiel: { game: "inspect", inspectMode: "listening", instruction: "先听清室内外的声响方向，再让米粒做出回应。" }
  };
  return profiles[petId] || { game, inspectMode: inspectMode || "scan", instruction: "" };
}

// Map every non-breakfast task to a companion's signature interaction. The
// task text may change by location, but the input language stays recognizable
// for that animal instead of falling back to a shared generic click loop.
function resolveTaskMiniGame(game, petId, inspectMode = "", locationId = state.location, keepDirect = false, forceSignature = false, contextId = "", randomize = false) {
  if (keepDirect) return resolvePetMiniGame(game, petId, inspectMode, locationId);
  if (randomize) {
    const picked = randomPetGame(petId, locationId, contextId);
    if (picked) return { game: picked.engine, inspectMode: picked.inspectMode || "", instruction: `${petById(petId).name}在${LOCATIONS[locationId].name}进行${picked.mode}，按提示完成这一轮。` };
  }
  const contextGames = {
    "chance-supply-crate": { game: "memory", instruction: "记住封条、角落和登记牌的位置，再按检查顺序确认补给来源。" },
    "chance-rescue-blanket": { game: "timing", instruction: "风势短暂变缓时收紧三处夹子，把毛毯固定回晾绳。" },
    "chance-home-visitor": { game: "choice", instruction: "根据访客的距离和情绪，连续三轮选择不会惊扰它的处理方式。" },
    "chance-lake-basket": { game: "throw", instruction: "控制长钩力度，把篮子旁的三件漂浮物投钩到岸边安全点。" },
    "chance-meadow-picnic": { game: "inspect", inspectMode: "scan", instruction: "用观察镜按风险等级扫描草地上的三个遗留点。" },
    "chance-clinic-delivery": { game: "timing", instruction: "在冷藏车指示灯亮起时完成三次物资交接。" },
    "chance-training-bell": { game: "memory", instruction: "记住三次训练铃的节奏，再按相同顺序回应伙伴。" },
    "chance-forest-branch": { game: "trail", instruction: "规划绕开断枝的安全路线，依次通过三个巡护标记。" },
    "chance-highland-tracks": { game: "inspect", inspectMode: "scan", instruction: "用标记板记录脚印的起点、转向和终点，确认它通往哪条山脊。" },
    "chance-home-meter": { game: "memory", instruction: "记住温度计、门垫和窗缝的顺序，再把保暖措施安排到位。" },
    "chance-rescue-tag": { game: "sort", instruction: "按动物体型和安置记录重新排序，避免把新来的伙伴放错区域。" },
    "chance-market-weighing": { game: "choice", instruction: "在三次称重结果中选择与货单一致的一项，确认补给数量再完成交接。" },
    "chance-clinic-quiet-room": { game: "choice", instruction: "选择合适的遮挡、距离和照明，让敏感动物安静完成转移。" },
    "chance-meadow-seedling": { game: "trail", instruction: "沿木桩路线绕开湿地，把三株幼苗扶回固定圈。" },
    "chance-lake-otter": { game: "pounce", instruction: "在水面波纹合适的时机收回浮漂，别惊动正在休息的水獭。" },
    "chance-forest-cache": { game: "memory", instruction: "记住树根、溪石和路标的位置，再按顺序取出可用物资。" },
    "chance-training-weather-vane": { game: "timing", instruction: "观察三次风向变化，在指针稳定时完成校准。" },
    "chance-highland-radio": { game: "match3", instruction: "把三个无线电信号片段配对，确认山谷没有异常。" },
    "saltmarsh-tide-report": { game: "sort", instruction: "按潮位尺、鸟巢箱和栈桥的变化顺序整理今天的保育记录。" },
    "greenhouse-night-pollinators": { game: "choice", instruction: "平衡灯光距离和通风，让夜行访客完成授粉后安全离开。" },
    "chance-saltmarsh-stranded-seal": { game: "pounce", instruction: "判断潮线和安全距离，在合适时机调整围观路线，不惊扰幼海豹。" },
    "chance-saltmarsh-tagged-bird": { game: "memory", instruction: "按羽色、方向和停留时间配对脚环记录，确认迁徙路线。" },
    "chance-greenhouse-pipe-leak": { game: "timing", instruction: "按水滴节奏找到渗漏点，放置接水盘并关闭对应阀门。" },
    "chance-greenhouse-bat-route": { game: "flight", instruction: "观察飞行高度和回声方向，移开三处不会改变回巢路线的遮挡物。" },
    "weather-fog-saltmarsh": { game: "trail", instruction: "用近岸标记确认栈桥方向，避开盐沼软泥区。" },
    "weather-rain-greenhouse": { game: "sort", instruction: "按遮光帘和集水桶的功能整理三处温室设施，保持栖息层干燥。" },
    "weather-drizzle-home": { game: "bubbles", instruction: "用擦布处理入口的七处水迹，擦拭顺序会影响防滑效果。" },
    "weather-rain-home": { game: "trail", instruction: "规划室内转移路线，把湿寝具送到三个干燥安置点。" },
    "weather-clear-meadow": { game: "timing", instruction: "在风铃草叶的节奏窗口内完成三次短跑起步。" },
    "weather-cloudy-clinic": { game: "inspect", inspectMode: "scan", instruction: "用观察镜记录三个低压力健康细节，完成阴天巡诊。" },
    "weather-storm-home": { game: "match3", instruction: "把相同的安抚标记交换成三枚，固定三处室内声响来源。" },
    "weather-heavy-rescue": { game: "trail", instruction: "规划室内转移路线，把三件受潮寝具送到干燥安置点。" },
    "weather-fog-forest": { game: "inspect", inspectMode: "watch", instruction: "在薄雾中观察三个逐渐显现的路标，再确认回谷方向。" },
    "weather-wind-market": { game: "inspect", inspectMode: "watch", instruction: "观察遮雨布的三个受力点，按风向变化顺序固定它们。" },
    "weather-cold-clinic": { game: "stroke", instruction: "沿保温垫纹理完成三段定向护理，让小型动物保持舒适。" },
    "market-delivery": { game: "timing", instruction: "装货绳结依次亮起，在稳定窗口内完成三次检查。" },
    "lakeside-boardwalk": { game: "inspect", inspectMode: "scan", instruction: "用观察镜记录木栈道、饮水点和浅湾边的三个安全细节。" },
    "lakeside-float-catch": { game: "timing", instruction: "看准浮漂进入黄色窗口的瞬间收杆，连续完成三次快收。" },
    "rescue-sort": { game: "memory", instruction: "先记住急救物资在托盘上的位置，再按原顺序归位，避免把药品放错格。" },
    "market-errand": { game: "timing", instruction: "货车指示灯依次亮起，在指针进入黄色窗口时完成三次交接。" },
    "home-peekaboo": { game: "memory", instruction: "记住影子出现的顺序，再按相同顺序回应，别惊动正在休息的伙伴。" },
    "home-quiet-listen": { game: "inspect", inspectMode: "listening", instruction: "听清雨声和室内动静的顺序，再让伙伴做出回应。" },
    "clinic-checkup": { game: "match3", instruction: "把相同的健康标记连成三枚，完成今天的检查记录。" },
    "clinic-records": { game: "match3", instruction: "把相同的健康标记连成三枚，完成今天的检查记录。" },
    "clinic-check": { game: "match3", instruction: "把相同的健康标记连成三枚，完成今天的检查记录。" },
    "clinic-listen": { game: "inspect", inspectMode: "listening", instruction: "听清呼吸节奏，再把听到的顺序记录下来。" },
    "clinic-sanitize": { game: "bubbles", instruction: "为每个护理区域选择对应工具，再沿安全路线处理，不要把清洁物带进候诊区。" },
    "highlands-patrol": { game: "trail", instruction: "根据风向和路标规划安全路线，带伙伴抵达高地观测点。" },
    "highlands-markers": { game: "trail", instruction: "根据风向和路标规划安全路线，带伙伴抵达高地观测点。" },
    "highlands-wind-read": { game: "trail", instruction: "根据风向和路标规划安全路线，带伙伴抵达高地观测点。" },
    "highlands-listen": { game: "inspect", inspectMode: "listening", instruction: "听清山谷回声方向，再沿安全路线回应。" },
    "highlands-supplies": { game: "timing", instruction: "风向旗每次只稳定片刻，在窗口内固定三件远行装备。" },
    "rescue-blanket-fold": { game: "memory", instruction: "记住毛毯和夹子的顺序，把护理物资按原位收好。" },
    "rescue-quiet-corner": { game: "inspect", inspectMode: "scan", instruction: "用观察镜找到不惊扰小动物的安全位置。" },
    "rescue-care-scan": { game: "stroke", instruction: "沿毛发生长方向完成护理梳理。" },
    "market-crate-sort": { game: "sort", instruction: "逐件查看物资标签，把食物、护理品和玩具放进对应木箱。" },
    "market-bell-run": { game: "trail", instruction: "根据铃声顺序规划送货路线，依次抵达三个摊位。" },
    "market-rope-knot": { game: "pounce", instruction: "在绳结亮起的瞬间收紧，连续完成三处装货固定。" },
    "meadow-wind-dash": { game: "play", instruction: "追上三片被风吹走的叶子，完成一轮短距离追逐。" },
    "meadow-scent-hunt": { game: "inspect", inspectMode: "scent", instruction: "沿草边的气味路线寻找隐藏奖励。" },
    "meadow-fetch": { game: "play", instruction: "让伙伴按顺序追上三个移动目标，保持草甸上的追逐节奏。" },
    "meadow-ring-hop": { game: "flight", instruction: "控制伙伴依次穿过三道花环，保持动作连贯。" },
    "lakeside-ripple-watch": { game: "pounce", instruction: "水纹出现时立即记录，连续捕捉三次短暂波动。" },
    "lakeside-reed-clean": { game: "bubbles", instruction: "用捞网连续清出三件卡在芦苇间的漂浮物。" },
    "forest-track": { game: "trail", instruction: "顺着脚印规划林间安全路线，避开湿滑地面。" },
    "forest-pinecone": { game: "throw", instruction: "控制力度把松果投过小溪，再让伙伴完成回收。" },
    "forest-canopy": { game: "flight", instruction: "引导伙伴穿过三道树冠光环，避开低枝。" },
    "forest-fox": { game: "inspect", inspectMode: "scan", instruction: "用观察镜记录溪边遮挡物后的三个幼狐踪迹。" },
    "training-pounce": { game: "pounce", instruction: "观察亮区，在正确时机完成三次伏击。" },
    "training-target": { game: "play", instruction: "连续追上三个移动目标，保持训练节奏。" },
    "training-throw": { game: "throw", instruction: "调节投掷力度，让专属道具落在安全区域。" }
    ,"saltmarsh-tide-map": { game: "trail", instruction: "规划不会踩坏鸟巢的木栈道路线。" }
    ,"saltmarsh-reed-signal": { game: "throw", instruction: "看准风向把标记旗插回潮沟边。" }
    ,"saltmarsh-shell-count": { game: "match3", instruction: "按潮线顺序配对三组贝壳样本。" }
    ,"greenhouse-night-bloom": { game: "pounce", instruction: "在花粉飘落前完成三次夜花引导。" }
    ,"greenhouse-roost-route": { game: "flight", instruction: "让伙伴按高度顺序穿过三道栖木。" }
    ,"greenhouse-lantern-code": { game: "memory", instruction: "记住灯影顺序，再回应夜行伙伴。" }
    ,"saltmarsh-tide-gate": { game: "timing", instruction: "在潮位稳定时记录三次水位。" }
    ,"saltmarsh-egret-watch": { game: "inspect", inspectMode: "watch", instruction: "沿木栈道记录不惊扰巢区的动静。" }
    ,"greenhouse-groom": { game: "stroke", instruction: "按栖木纹理完成一轮温和护理。" }
    ,"greenhouse-lamp-cycle": { game: "timing", instruction: "在三次亮灯窗口内调整遮光帘。" }
  };
  if (contextId === "market-errand" && petId === "hamster") {
    return { game: "burrow", inspectMode: "", instruction: "穿过地道绕开堵塞，收集三颗籽粮后再回到集市。" };
  }
  if (contextGames[contextId]) return { ...contextGames[contextId], inspectMode: contextGames[contextId].inspectMode || "" };
  // Explicitly named interactions already carry a concrete mechanic (for
  // example fishing, cleanup, or a rhythm route); keep those semantics intact.
  if (!forceSignature && ((inspectMode && inspectMode !== "scan") || ["bubbles", "throw", "carrot", "fishing", "flight", "stroke", "forage", "stash", "song", "trace", "perch"].includes(game))) {
    return resolvePetMiniGame(game, petId, inspectMode, locationId);
  }
  const profiles = {
    dog: {
      game: "inspect", inspectMode: "scent",
      instruction: "按住鼻尖沿连续气味线移动，奶糖会用嗅觉确认这项任务的关键位置。"
    },
    cat: {
      game: locationId === "lakeside" ? "fishing" : "pounce", inspectMode: "",
      instruction: locationId === "lakeside" ? "观察浮漂，在水面下沉的瞬间收杆。" : "等目标进入亮区，在正确时机点击扑击。"
    },
    rabbit: {
      game: "carrot", inspectMode: "",
      instruction: "跟着左右节奏交替发力，让团子完成一轮敏捷采收。"
    },
    hamster: {
      game: "burrow", inspectMode: "",
      instruction: "用方向键或滑动控制布丁穿过地道，绕开堵塞并收集三颗籽粮。"
    },
    poodle: {
      game: "stroke", inspectMode: "",
      instruction: "沿着指示方向来回梳理，云朵会用整洁习惯完成这项任务。"
    },
    fox: {
      game: "throw", inspectMode: "",
      instruction: "看准力度把信物投进安全落点，栗子会判断路线后完成回收。"
    },
    budgie: {
      game: "flight", inspectMode: "",
      instruction: "按住场景引导青豆依次穿过三道召回环，保持飞行高度。"
    },
    cockatiel: {
      game: "inspect", inspectMode: "listening",
      instruction: "先听清三个声源的方向，再让米粒逐一回应。"
    }
  };
  return profiles[petId] || resolvePetMiniGame(game, petId, inspectMode, locationId);
}

function launchMiniGame(game, petId, title, instruction, inspectMode = "") {
  const resolvedInspectMode = game === "inspect" ? (inspectMode || "scan") : "";
  const modeLabel = miniGameModeLabel(game, resolvedInspectMode, petId);
  const difficulty = miniDifficultyFor(game, resolvedInspectMode);
  const mastery = miniMasteryFor(game, resolvedInspectMode);
  miniGameSession = { game, inspectMode: resolvedInspectMode, petId, startedAt: Date.now(), misses: 0, hits: 0, combo: 0, bestCombo: 0, rounds: 0, progress: 0, difficulty };
  state.miniGameActive = true;
  showPet(petId, game === "drag" ? "eat" : game === "play" ? "play" : "affection");
  els.location.classList.add("playing");
  // 手机上提示条铺满底部，会盖住小游戏的操作按钮，所以开局时把提示条抬高。
  document.body.classList.add("mini-open");
  els.miniGame.hidden = false;
  els.miniGame.dataset.game = game;
  els.miniGame.dataset.inspectMode = resolvedInspectMode;
  els.miniGame.dataset.pet = petId;
  els.miniGame.dataset.tier = String(difficulty.tier);
  els.miniGame.dataset.rounds = "0";
  els.miniGame.setAttribute("role", "dialog");
  els.miniGame.setAttribute("aria-modal", "true");
  els.miniGame.setAttribute("aria-labelledby", "miniTitle");
  const masteryNote = mastery.bestRating ? `最佳 ${mastery.bestRating} · 连击 ×${mastery.bestCombo}` : `第 ${mastery.plays + 1} 次挑战`;
  els.miniGame.innerHTML = `<div class="mini-header"><div><h2 id="miniTitle"><span>${title}</span><small class="mini-mode-label">${modeLabel}</small><small class="mini-difficulty" id="miniDifficulty" data-tier="${difficulty.tier}" title="${masteryNote}">难度 ${difficulty.tier}/4 · ${difficulty.label}</small></h2><p id="miniInstruction">${instruction}</p></div><div class="mini-rapport" aria-live="polite"><small>互动质量</small><b id="miniRapport">默契准备中</b><em id="miniCombo" hidden>连击 ×0</em></div><div class="mini-progress" role="progressbar" aria-label="小游戏完成进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span id="miniProgress"></span></div><button class="mini-close" aria-label="退出小游戏">×</button></div><div class="mini-canvas" id="miniCanvas"><img class="mini-pet" id="miniPet" src="${petFramePath(petId, "idle", 0)}" alt="${petById(petId).name}" draggable="false" /></div>`;
  miniCanvas().addEventListener("selectstart", event => event.preventDefault());
  miniCanvas().addEventListener("dragstart", event => event.preventDefault());
  els.miniGame.querySelector(".mini-close").addEventListener("click", cancelMiniGame);
  if (game === "drag") buildFeedGame(petId);
  else if (game === "play") buildPlayGame(petId);
  else if (game === "pounce") buildPounceGame(petId);
  else if (game === "flight") buildFlightGame(petId);
  else if (game === "fishing") buildFishingGame(petId);
  else if (game === "carrot") buildCarrotGame(petId);
  else if (game === "throw") buildThrowGame(petId);
  else if (game === "burrow") buildBurrowGame(petId);
  else if (game === "memory") buildMemoryGame(petId);
  else if (game === "match3") buildMatch3Game(petId);
  else if (game === "trail") buildTrailGame(petId);
  else if (game === "timing") buildTimingGame(petId);
  else if (game === "choice") buildChoiceGame(petId);
  else if (game === "sort") buildSortGame(petId);
  else if (game === "forage") buildForageGame(petId);
  else if (game === "stash") buildStashGame(petId);
  else if (game === "song") buildSongGame(petId);
  else if (game === "trace") buildTraceGame(petId);
  else if (game === "perch") buildPerchGame(petId);
  else if (game === "inspect") buildInspectGame(petId, resolvedInspectMode);
  else if (game === "bubbles") buildBubbleGame(petId);
  else buildStrokeGame(petId);
  animateMiniGameOpen();
  playPetVoice(petId, "alert");
}

function animateMiniGameOpen() {
  if (!window.gsap || reducedMotion()) return;
  const header = els.miniGame.querySelector(".mini-header");
  const pet = els.miniGame.querySelector(".mini-pet");
  const props = [...els.miniGame.querySelectorAll(".drag-item, .play-goal, .inspect-spot, .scent-wisp, .perch-signal, .scan-clues i, .flight-ring, .rhythm-controls, .power-meter, .pounce-track, .pounce-command, .cleanup-tool, .hand-tool, .burrow-cell, .burrow-controls button, .memory-card, .match3-tile, .trail-cell, .timing-track, .timing-command, .forage-leaf, .stash-pouch, .song-key, .song-phrase i")].slice(0, 12);
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .fromTo(header, { y: -34, xPercent: -50, scale: .95, autoAlpha: .08 }, { y: 0, xPercent: -50, scale: 1, autoAlpha: 1, duration: .48, clearProps: "opacity,visibility" }, 0)
    .fromTo(pet, { y: 46, scale: .76, autoAlpha: .08 }, { y: 0, scale: 1, autoAlpha: 1, duration: .62, clearProps: "transform,opacity,visibility" }, .06)
    .fromTo(props, { y: 22, scale: .72, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: .42, stagger: { each: .035, amount: .24 }, clearProps: "transform,opacity,visibility" }, .18);
}

function miniCanvas() { return $("#miniCanvas"); }

/** Mini-game callbacks share one HUD, so every scheduled step is dropped when the round closes. */
function miniTimeout(callback, delay) {
  const id = setTimeout(() => {
    miniTimers.delete(id);
    if (state.miniGameActive) callback();
  }, delay);
  miniTimers.add(id);
  return id;
}

function clearMiniTimers() {
  miniTimers.forEach(id => clearTimeout(id));
  miniTimers.clear();
}

function miniGameContextKey() {
  const context = activeGameContext;
  return context?.activity?.id || context?.event?.id || context?.game?.id || context?.id || "";
}
function miniGameVariant(salt, size) {
  const key = miniGameContextKey();
  return key ? hashGameSeed(`${key}:${salt}`) % size : 0;
}
function setMiniProgress(value, message) {
  const bar = $("#miniProgress");
  if (bar) {
    const progress = clamp(value, 0, 1);
    if (miniGameSession && progress > miniGameSession.progress) miniGameSession.progress = progress;
    bar.style.transform = `scaleX(${progress})`;
    bar.parentElement.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
  }
  if (message && $("#miniInstruction")) $("#miniInstruction").textContent = message;
  updateMiniRapport();
}

function miniMasteryKey(game, inspectMode = "") { return inspectMode ? `${game}:${inspectMode}` : game; }

function miniMasteryFor(game, inspectMode = "") {
  if (!state.miniMastery) state.miniMastery = {};
  const key = miniMasteryKey(game, inspectMode);
  if (!state.miniMastery[key]) state.miniMastery[key] = { plays: 0, bestCombo: 0, bestRating: "" };
  return state.miniMastery[key];
}

/** Difficulty follows completions of this exact interaction, so every mechanic escalates on its own curve. */
function miniDifficultyFor(game, inspectMode = "") {
  const plays = miniMasteryFor(game, inspectMode).plays;
  const index = MINI_DIFFICULTY_TIERS.reduce((tier, item, order) => (plays >= item.plays ? order : tier), 0);
  return MINI_DIFFICULTY_TIERS[index];
}

function miniTier() { return miniGameSession?.difficulty || MINI_DIFFICULTY_TIERS[0]; }

/** Single source of truth for "how many successes clear this round" — replaces the old hard-coded threes. */
function miniRounds(base, max = base + 3, step = 1) {
  const total = clamp(Math.round(base + miniTier().bonus * step), 1, max);
  if (miniGameSession) miniGameSession.rounds = total;
  if (els.miniGame) els.miniGame.dataset.rounds = String(total);
  return total;
}

function miniSpeed(base) { return base * miniTier().speed; }
function miniWindow(halfWidth) { return Math.max(2.5, halfWidth * miniTier().window); }
function miniDelay(base) { return Math.round(base / miniTier().speed); }

function registerMiniHit(weight = 1) {
  const session = miniGameSession;
  if (!session) return 0;
  session.hits += weight;
  session.combo += 1;
  session.bestCombo = Math.max(session.bestCombo, session.combo);
  updateMiniRapport();
  return session.combo;
}

function miniComboNote() {
  const combo = miniGameSession?.combo || 0;
  return combo >= 3 ? `连击 ×${combo}，` : "";
}

function miniGameRating() {
  const session = miniGameSession;
  const difficulty = miniTier();
  if (!session) return { id: "B", label: "陪伴", reward: {}, combo: 0, rounds: 0, difficulty };
  const rounds = Math.max(1, session.rounds || session.hits || 1);
  const attempts = session.hits + session.misses;
  const accuracy = attempts ? session.hits / attempts : 1;
  const comboRatio = clamp(session.bestCombo / rounds, 0, 1);
  const score = clamp(accuracy * .64 + comboRatio * .36, 0, 1);
  const grade = MINI_RATINGS.find(item => score >= item.min) || MINI_RATINGS.at(-1);
  const reward = Object.fromEntries(Object.entries(grade.reward).map(([key, value]) => [key, Math.max(1, Math.round(value * difficulty.reward))]));
  return { id: grade.id, label: grade.label, reward, score, combo: session.bestCombo, rounds, difficulty };
}

function miniMasterySummary() {
  return Object.entries(state.miniMastery || {})
    .filter(([, item]) => item.plays > 0)
    .sort(([, first], [, second]) => second.plays - first.plays)
    .map(([key, item]) => {
      const [game, inspectMode = ""] = key.split(":");
      const difficulty = miniDifficultyFor(game, inspectMode);
      return { key, label: miniGameModeLabel(game, inspectMode), tier: difficulty.tier, difficulty: `${difficulty.label}（${difficulty.note}）`, plays: item.plays, bestRating: item.bestRating, bestCombo: item.bestCombo };
    });
}

function recordMiniMastery(rating) {
  const session = miniGameSession;
  if (!session) return;
  const mastery = miniMasteryFor(session.game, session.inspectMode);
  mastery.plays += 1;
  mastery.bestCombo = Math.max(mastery.bestCombo, rating.combo);
  const bestIndex = MINI_RATINGS.findIndex(item => item.id === mastery.bestRating);
  const earnedIndex = MINI_RATINGS.findIndex(item => item.id === rating.id);
  if (bestIndex < 0 || earnedIndex < bestIndex) mastery.bestRating = rating.id;
  state.records.miniGames += 1;
  if (rating.id === "S") state.records.perfectGames += 1;
  state.records.bestCombo = Math.max(state.records.bestCombo || 0, rating.combo);
}

function combineRewards(primary = {}, bonus = {}) {
  const merged = { ...primary };
  Object.entries(bonus).forEach(([key, value]) => {
    merged[key] = typeof merged[key] === "number" && typeof value === "number" ? merged[key] + value : value;
  });
  return merged;
}

function updateMiniRapport() {
  const label = $("#miniRapport");
  if (!label || !miniGameSession) return;
  const { misses, combo } = miniGameSession;
  label.textContent = misses === 0 ? "默契推进" : misses <= 2 ? "耐心磨合" : "坚持陪伴";
  label.classList.toggle("steady", misses === 0);
  label.classList.toggle("recovering", misses > 0);
  const chip = $("#miniCombo");
  if (!chip) return;
  chip.hidden = combo < 2;
  chip.textContent = `连击 ×${combo}`;
  chip.classList.toggle("hot", combo >= 4);
}

function registerMiniMiss() {
  if (!miniGameSession) return;
  miniGameSession.misses += 1;
  miniGameSession.combo = 0;
  updateMiniRapport();
}

function cueInteractive(element) {
  if (!element) return;
  element.classList.remove("attention");
  void element.offsetWidth;
  element.classList.add("attention");
  setTimeout(() => element.isConnected && element.classList.remove("attention"), 1450);
}

function resetMiniPet(petId) {
  const pet = $("#miniPet");
  if (!pet) return;
  stopPetFrames(pet);
  window.gsap?.killTweensOf?.(pet);
  window.gsap?.set?.(pet, { clearProps: "transform,opacity" });
  pet.src = petFramePath(petId, "idle", 0);
}

function playEatingSequence(petId, food, onComplete) {
  const pet = $("#miniPet");
  if (!pet || !food) { onComplete(); return; }
  food.disabled = true;
  food.classList.add("placed-food");
  startPetFrameLoop(pet, petId, "eat", 540);
  const done = () => {
    food.remove();
    resetMiniPet(petId);
    onComplete();
  };
  if (!window.gsap || reducedMotion()) { playFoley("bite"); miniTimeout(done, 1350); return; }
  gsap.timeline({ onComplete: done })
    .to(food, { left: "50%", top: "73%", xPercent: -50, yPercent: -50, x: 0, y: 0, scale: .92, duration: .42, ease: "power2.out" })
    .to(pet, { y: 22, scaleX: 1.025, scaleY: .955, rotation: -1, duration: .58, ease: "power2.inOut" }, "<.08")
    .call(() => { playEatingSound(); playPetVoice(petId, "soft"); })
    .to(pet, { rotation: 1.4, duration: .3, repeat: 3, yoyo: true, ease: "sine.inOut" })
    .to(food, { opacity: .18, scale: .66, duration: .72, ease: "power1.in" }, "<")
    .to(pet, { y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: .68, ease: "power2.out" });
}

function playFetchSequence(petId, ball, target, onComplete) {
  const pet = $("#miniPet");
  if (!pet || !ball || !target) { onComplete(); return; }
  ball.disabled = true;
  ball.classList.add("is-carried");
  startPetFrameLoop(pet, petId, "play", 500);
  const canvas = miniCanvas();
  const canvasRect = canvas.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const petRect = pet.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();
  const targetX = targetRect.left + targetRect.width / 2;
  const travelX = clamp(targetX - (petRect.left + petRect.width / 2), -canvasRect.width * .34, canvasRect.width * .34);
  const facing = travelX < 0 ? -1 : 1;
  const contactX = targetX - facing * Math.min(48, petRect.width * .12);
  const contactY = petRect.top + petRect.height * .62;
  const ballDx = contactX - (ballRect.left + ballRect.width / 2);
  const ballDy = contactY - (ballRect.top + ballRect.height / 2);
  const done = () => {
    resetMiniPet(petId);
    ball.classList.remove("is-carried");
    ball.disabled = false;
    onComplete();
  };
  if (!window.gsap || reducedMotion()) { playFoley("ball"); miniTimeout(done, 1250); return; }
  gsap.timeline({ onComplete: done })
    .set(pet, { scaleX: facing })
    .to(pet, { x: travelX * .9, y: -13, duration: .74, ease: "power2.inOut" }, 0)
    .to(pet, { x: travelX, y: 1, scaleX: facing * 1.04, scaleY: .97, duration: .28, ease: "power2.in" })
    .to(ball, { x: `+=${ballDx}`, y: `+=${ballDy}`, rotation: facing * 18, scale: .88, duration: .25, ease: "power2.in" }, "<")
    .call(() => { playFoley("ball"); playPetVoice(petId, "happy"); })
    .set(pet, { scaleX: -facing })
    .to(ball, { left: "50%", top: "73%", xPercent: -50, yPercent: -50, x: 0, y: 0, rotation: 180, scale: .88, duration: .76, ease: "power2.inOut" })
    .to(pet, { x: 0, y: 0, rotation: 0, scaleX: -facing, scaleY: 1, duration: .76, ease: "power2.inOut" }, "<")
    .to(pet, { scaleX: 1, duration: .18, ease: "power2.out" });
}

function buildFeedGame(petId) {
  const canvas = miniCanvas();
  const rounds = miniRounds(3, 6);
  canvas.insertAdjacentHTML("beforeend", `<div class="drop-target" id="dropTarget"></div><div class="drag-count" id="dragCount">0 / ${rounds}</div>`);
  let fed = 0;
  const usedPositions = [];
  const nextPosition = () => {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const candidate = { left: 8 + Math.random() * 22, top: 34 + Math.random() * 38 };
      if (usedPositions.every(position => Math.hypot(candidate.left - position.left, candidate.top - position.top) > 14)) { usedPositions.push(candidate); return candidate; }
    }
    return { left: 10 + fed * 7, top: 40 + (fed % 2) * 24 };
  };
  const spawn = () => {
    const position = nextPosition();
    const item = document.createElement("button");
    item.type = "button";
    item.className = "drag-item food-item";
    item.style.left = `${position.left}%`;
    item.style.top = `${position.top}%`;
    item.dataset.spawn = `${position.left.toFixed(2)},${position.top.toFixed(2)}`;
    item.innerHTML = `<img src="${PET_FOOD_ASSETS[petId]}" alt="" draggable="false" />`;
    item.setAttribute("aria-label", `投放第 ${fed + 1} 份食物`);
    canvas.append(item);
    cueInteractive(item);
    makeDraggable(item, $("#dropTarget"), () => {
      fed += 1;
      registerMiniHit();
      $("#dragCount").textContent = `${fed} / ${rounds}`;
      setMiniProgress(fed / rounds, fed < rounds ? `${miniComboNote()}再准备一份，放到它面前。` : "吃得很认真。" );
      playEatingSequence(petId, item, () => {
        if (fed >= rounds) miniTimeout(finishActiveGame, 520); else miniTimeout(spawn, 260);
      });
    });
    item.focus({ preventScroll: true });
  };
  spawn();
}

function buildPlayGame(petId) {
  const canvas = miniCanvas();
  const play = PET_PLAY_CONFIG[petId] || PET_PLAY_CONFIG.dog;
  // 落点用左上角定位，窄屏上 left 超过 76% 或 top 超过 66% 会被画面裁掉。
  const layoutVariants = [
    [[76, 18], [18, 32], [70, 58], [34, 66], [62, 40], [46, 22]],
    [[68, 24], [24, 22], [74, 62], [40, 58], [16, 52], [58, 34]],
    [[74, 38], [20, 56], [58, 18], [66, 64], [36, 34], [50, 64]],
    [[56, 16], [76, 48], [22, 64], [70, 30], [30, 26], [48, 63]]
  ];
  const rounds = miniRounds(3, 6);
  const positions = layoutVariants[miniGameVariant("play-layout", layoutVariants.length)].slice(0, rounds);
  positions.forEach(([left, top], index) => canvas.insertAdjacentHTML("beforeend", `<button type="button" class="play-goal ${index === 0 ? "active" : ""}" data-goal="${index}" style="left:${left}%;top:${top}%">目标 ${index + 1}</button>`));
  const ball = document.createElement("button");
  ball.type = "button";
  ball.className = "ball play-token";
  ball.style.left = "12%";
  ball.style.top = "72%";
  ball.setAttribute("aria-label", `点击${play.label}回应目标`);
  ball.innerHTML = `<img src="${play.asset}" alt="" draggable="false" />`;
  canvas.append(ball);
  let goal = 0;
  let animating = false;
  const chooseTarget = index => {
    if (animating) return;
    const target = canvas.querySelector(`[data-goal="${index}"]`);
    if (index !== goal || !target) { playFoley("miss"); setMiniProgress(goal / rounds, "目标跑到别处了，追踪亮起的落点。" ); return; }
    animating = true;
    target.classList.remove("active");
    playFoley("ball");
    showMiniPetPose(petId, "play");
    const targetRect = target.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    if (window.gsap && !reducedMotion()) gsap.to(ball, { left: `${((targetRect.left - canvasRect.left) / Math.max(1, canvasRect.width)) * 100}%`, top: `${((targetRect.top - canvasRect.top) / Math.max(1, canvasRect.height)) * 100}%`, scale: .72, rotation: 18, duration: .28, ease: "power2.out" });
    miniTimeout(() => {
      goal += 1;
      registerMiniHit();
      ball.style.transform = "";
      setMiniProgress(goal / rounds, goal < rounds ? `${miniComboNote()}它追上了${play.label}，下一个目标亮起来了。` : `完成了一整轮${play.label}追逐。` );
      if (goal >= rounds) { ball.remove(); miniTimeout(finishActiveGame, 500); return; }
      canvas.querySelector(`[data-goal="${goal}"]`)?.classList.add("active");
      ball.style.left = `${12 + goal * 6}%`;
      ball.style.top = `${72 - goal * 5}%`;
      ball.style.transform = "";
      animating = false;
      canvas.querySelector(`[data-goal="${goal}"]`)?.focus({ preventScroll: true });
    }, 320);
  };
  canvas.querySelectorAll("[data-goal]").forEach(target => target.addEventListener("click", () => chooseTarget(Number(target.dataset.goal))));
  // The ball is the primary control on touch and keyboard: activating it sends
  // the companion toward the currently lit target. Goal markers remain direct
  // pointers for players who prefer selecting the destination itself.
  ball.addEventListener("click", () => chooseTarget(goal));
  ball.addEventListener("keydown", event => {
    if (!["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    chooseTarget(goal);
  });
  setMiniProgress(0, `点击亮起的目标，让伙伴追上${play.label}，共 ${rounds} 个落点。`);
  ball.focus({ preventScroll: true });
}

function buildPounceGame(petId) {
  const canvas = miniCanvas();
  const toy = PET_PLAY_CONFIG.cat;
  const rounds = miniRounds(3, 6);
  const half = miniWindow(11.5);
  canvas.insertAdjacentHTML("beforeend", `<div class="pounce-stage" aria-hidden="true"><img id="pounceToy" src="${toy.asset}" alt="" draggable="false" /></div><div class="pounce-prompt" id="pouncePrompt" aria-live="assertive">等羽毛玩具进入亮区</div><div class="pounce-track" aria-label="伏击时机轨道"><i style="left:${52.5 - half}%;width:${half * 2}%"></i><span id="pounceMarker"></span></div><button class="mini-command pounce-command" id="pounceCommand">现在扑击</button><div class="drag-count" id="pounceCount">0 / ${rounds}</div>`);
  const toyElement = $("#pounceToy");
  const marker = $("#pounceMarker");
  const prompt = $("#pouncePrompt");
  const command = $("#pounceCommand");
  let position = 0;
  let direction = 1;
  let catches = 0;
  let locked = false;
  const markerSpeed = miniSpeed(2.25 + miniGameVariant("pounce-speed", 3) * .45);
  const updatePouncePosition = () => {
    marker.style.left = `${position}%`;
    marker.style.transform = "translateX(-50%)";
    toyElement.style.left = `${10 + position * .78}%`;
  };
  miniGameTimer = setInterval(() => {
    position += direction * markerSpeed;
    if (position >= 100 || position <= 0) { position = clamp(position, 0, 100); direction *= -1; }
    updatePouncePosition();
  }, 28);
  const pounce = () => {
    if (locked) return;
    const accurate = Math.abs(position - 52.5) <= half;
    if (!accurate) {
      playFoley("miss");
      prompt.textContent = position < 52.5 ? "还太早，等它进入亮区" : "慢了一步，等它下一次经过亮区";
      return;
    }
    locked = true;
    catches += 1;
    registerMiniHit();
    clearInterval(miniGameTimer);
    playFoley("tap");
    showMiniPetPose(petId, "play");
    $("#pounceCount").textContent = `${catches} / ${rounds}`;
    prompt.textContent = catches < rounds ? `${miniComboNote()}扑得漂亮，准备下一次伏击` : `${rounds} 次伏击都判断准确。`;
    setMiniProgress(catches / rounds, prompt.textContent);
    if (window.gsap && !reducedMotion()) gsap.fromTo(toyElement, { y: 0, rotation: -8, scale: 1 }, { y: 72, rotation: 26, scale: .72, duration: .36, ease: "power2.in", yoyo: true, repeat: 1 });
    miniTimeout(() => {
      if (catches >= rounds) { finishActiveGame(); return; }
      position = 8 + Math.random() * 18;
      direction = 1;
      locked = false;
      miniGameTimer = setInterval(() => {
        position += direction * markerSpeed;
        if (position >= 100 || position <= 0) { position = clamp(position, 0, 100); direction *= -1; }
        updatePouncePosition();
      }, 28);
    }, 720);
  };
  command.addEventListener("click", pounce);
  command.addEventListener("keydown", event => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); pounce(); } });
  command.focus({ preventScroll: true });
}

function buildFlightGame(petId) {
  const canvas = miniCanvas();
  const courseVariants = [
    [[20, 34], [72, 24], [55, 58], [30, 66], [82, 52], [46, 20]],
    [[24, 58], [70, 36], [42, 18], [84, 62], [16, 30], [58, 48]],
    [[18, 24], [54, 62], [80, 34], [36, 40], [68, 18], [26, 66]],
    [[46, 18], [22, 52], [76, 62], [62, 30], [34, 24], [84, 40]]
  ];
  // 玄凤走的是栖木阶梯：环按高度排序、判定更窄；虎皮鹦鹉保持自由的低空航线。
  const perchLadder = petId === "cockatiel";
  const rounds = miniRounds(perchLadder ? 4 : 3, 6);
  const course = courseVariants[miniGameVariant("flight-course", courseVariants.length)].slice(0, rounds);
  const positions = perchLadder ? [...course].sort((first, second) => second[1] - first[1]) : course;
  const pad = perchLadder ? 8 : 18;
  canvas.insertAdjacentHTML("beforeend", `<div class="flight-course${perchLadder ? " perch-ladder" : ""}" aria-hidden="true">${positions.map(([left, top], index) => `<i class="flight-ring ${index === 0 ? "active" : ""}" data-flight-ring="${index}" style="left:${left}%;top:${top}%"><span>${index + 1}</span></i>`).join("")}</div><div class="flight-field" id="flightField" role="slider" tabindex="0" data-flight-pad="${pad}" aria-label="${perchLadder ? `按住并引导伙伴从低处栖木依次升到第 ${rounds} 道环` : `按住并引导伙伴依次穿过 ${rounds} 道召回环`}" aria-valuemin="0" aria-valuemax="${rounds}" aria-valuenow="0"></div>`);
  const field = $("#flightField");
  const pet = $("#miniPet");
  pet.classList.add("is-flying");
  let flying = false;
  let current = 0;
  let lastX = 0;
  const positionPet = (x, y) => {
    const facing = x < lastX ? -1 : 1;
    lastX = x;
    pet.style.transform = `translate3d(${x - 82}px, ${y - 62}px, 0) scaleX(${facing})`;
  };
  const passRing = () => {
    const ring = canvas.querySelector(`[data-flight-ring="${current}"]`);
    if (!ring) return;
    ring.classList.remove("active");
    ring.classList.add("passed");
    current += 1;
    registerMiniHit();
    field.setAttribute("aria-valuenow", String(current));
    canvas.querySelector(`[data-flight-ring="${current}"]`)?.classList.add("active");
    playFoley("flutter");
    playPetVoice(petId, "happy");
    setMiniProgress(current / positions.length, current < positions.length ? `${miniComboNote()}${perchLadder ? "稳住高度，继续升向上一层栖木环。" : "保持平稳，继续引导它飞向下一道亮环。"}` : `${positions.length} 道${perchLadder ? "栖木环都按高度顺序通过" : "召回环都顺利通过"}。` );
    if (current >= positions.length) miniTimeout(finishActiveGame, 750);
  };
  const move = event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    positionPet(x, y);
    if (!flying) return;
    const ringRect = canvas.querySelector(`[data-flight-ring="${current}"]`)?.getBoundingClientRect();
    if (ringRect && event.clientX >= ringRect.left - pad && event.clientX <= ringRect.right + pad && event.clientY >= ringRect.top - pad && event.clientY <= ringRect.bottom + pad) passRing();
  };
  field.addEventListener("pointerdown", event => { flying = true; field.setPointerCapture?.(event.pointerId); move(event); });
  field.addEventListener("pointermove", move);
  field.addEventListener("pointerup", () => { flying = false; });
  field.addEventListener("pointercancel", () => { flying = false; });
  field.addEventListener("keydown", event => {
    if (!["Enter", " ", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const [left, top] = positions[current] || positions.at(-1);
    positionPet(canvas.clientWidth * left / 100, canvas.clientHeight * top / 100);
    passRing();
  });
  requestAnimationFrame(() => positionPet(canvas.clientWidth * .12, canvas.clientHeight * .7));
  setMiniProgress(0, perchLadder ? `从最低的栖木开始，按高度顺序穿过 ${rounds} 道环，判定比低空航线更窄。` : `按住场景引导伙伴飞行，必须让身体依次穿过 ${rounds} 道亮环。` );
  field.focus({ preventScroll: true });
}

function buildFishingGame(petId) {
  const canvas = miniCanvas();
  canvas.insertAdjacentHTML("beforeend", `<div class="fishing-water" aria-hidden="true"><i></i><i></i><i></i></div><img class="fishing-rod" src="assets/props/fishing-rod.webp" alt="" draggable="false" /><button class="fishing-float" id="fishingFloat" aria-label="浮漂，等待鱼上钩"><span></span></button><button class="mini-command" id="fishCommand">抛线</button><div class="catch-tray" id="catchTray" aria-live="polite"></div>`);
  const float = $("#fishingFloat");
  const command = $("#fishCommand");
  const tray = $("#catchTray");
  const rounds = miniRounds(2, 5);
  const biteWindow = miniDelay(1800);
  let phase = "ready";
  let caught = 0;
  const cast = () => {
    phase = "waiting";
    command.disabled = true;
    command.textContent = "等待水面动静";
    float.classList.add("waiting");
    playFoley("cast");
    setMiniProgress(caught / rounds, "浮漂还很平稳，先不要惊动水面。" );
    clearTimeout(miniGameTimer);
    miniGameTimer = setTimeout(() => {
      if (!state.miniGameActive) return;
      phase = "bite";
      float.classList.remove("waiting");
      float.classList.add("biting");
      command.disabled = false;
      command.textContent = "立即收杆";
      setMiniProgress(caught / rounds, "浮漂下沉了，现在收杆。" );
      playFoley("splash");
      miniGameTimer = setTimeout(() => {
        if (phase !== "bite" || !state.miniGameActive) return;
        phase = "ready";
        float.classList.remove("biting");
        command.textContent = "重新抛线";
        registerMiniMiss();
        setMiniProgress(caught / rounds, "收杆慢了一步，鱼游走了。" );
      }, biteWindow);
    }, 850 + Math.random() * 1500);
  };
  const reel = () => {
    if (phase === "ready") { cast(); return; }
    if (phase !== "bite") return;
    clearTimeout(miniGameTimer);
    phase = "landing";
    command.disabled = true;
    float.classList.remove("biting");
    const fish = document.createElement("img");
    fish.className = "caught-fish";
    fish.src = "assets/props/fish.webp";
    fish.alt = "钓起的鲜鱼";
    canvas.append(fish);
    playFoley("reel");
    if (window.gsap && !reducedMotion()) gsap.fromTo(fish, { x: 120, y: 70, rotation: 28, scale: .55, opacity: 0 }, { x: -40, y: -55, rotation: -12, scale: 1, opacity: 1, duration: .72, ease: "power3.out" });
    caught += 1;
    registerMiniHit();
    tray.textContent = `已钓到 ${caught} / ${rounds} 条`;
    showMiniPetPose(petId, "play");
    setMiniProgress(caught / rounds, caught < rounds ? `${miniComboNote()}鱼已经放进保鲜篮，再试一次。` : "今天的鲜鱼收获完成。" );
    miniTimeout(() => {
      fish.remove();
      if (caught >= rounds) finishActiveGame();
      else { phase = "ready"; command.disabled = false; command.textContent = "再次抛线"; command.focus({ preventScroll: true }); }
    }, 1050);
  };
  command.addEventListener("click", reel);
  float.addEventListener("click", () => { if (phase === "bite") reel(); });
  command.focus({ preventScroll: true });
}

function buildCarrotGame(petId) {
  const canvas = miniCanvas();
  canvas.insertAdjacentHTML("beforeend", `<div class="garden-soil" aria-hidden="true"></div><div class="carrot-stage"><img id="carrotCrop" src="assets/props/carrot.webp" alt="正在拔出的萝卜" draggable="false" /></div><div class="rhythm-prompt" id="rhythmPrompt" aria-live="assertive">先按左</div><div class="rhythm-controls"><button id="pullLeft" aria-label="向左发力">←<span>左</span></button><button id="pullRight" aria-label="向右发力">→<span>右</span></button></div>`);
  const crop = $("#carrotCrop");
  const prompt = $("#rhythmPrompt");
  const controls = [$("#pullLeft"), $("#pullRight")];
  const rhythmPattern = ["left", "right"];
  let expected = rhythmPattern[0];
  let beats = 0;
  const totalBeats = miniRounds(12, 24, 3);
  const press = direction => {
    if (direction !== expected) {
      beats = Math.max(0, beats - 1);
      prompt.textContent = `节奏乱了，下一拍按${expected === "left" ? "左" : "右"}`;
      playFoley("soil");
      registerMiniMiss();
    } else {
      beats += 1;
      registerMiniHit();
      expected = rhythmPattern[beats % rhythmPattern.length];
      prompt.textContent = beats >= totalBeats ? "萝卜松动了" : `${miniComboNote()}下一拍按${expected === "left" ? "左" : "右"}`;
      playFoley("step");
      showMiniPetPose(petId, beats % 3 ? "play" : "affection");
    }
    const progress = beats / totalBeats;
    crop.style.transform = `translateY(${(1 - progress) * 42}px) rotate(${direction === "left" ? -3 : 3}deg)`;
    setMiniProgress(progress, beats < totalBeats ? "保持左右交替，让泥土逐渐松开。" : "萝卜完整地拔出来了。" );
    if (beats >= totalBeats) {
      controls.forEach(button => { button.disabled = true; });
      playFoley("pull");
      if (window.gsap && !reducedMotion()) gsap.to(crop, { y: -90, rotation: -10, duration: .58, ease: "power3.out" });
      miniTimeout(finishActiveGame, 850);
    }
  };
  controls[0].addEventListener("click", () => press("left"));
  controls[1].addEventListener("click", () => press("right"));
  setMiniProgress(0, `左右交替共 ${totalBeats} 拍，节奏乱了会退回一拍。` );
  controls[0].focus({ preventScroll: true });
}

function buildThrowGame(petId) {
  const canvas = miniCanvas();
  const play = PET_PLAY_CONFIG[petId] || PET_PLAY_CONFIG.dog;
  const rounds = miniRounds(3, 6);
  const half = miniWindow(17);
  canvas.insertAdjacentHTML("beforeend", `<div class="throw-course" aria-hidden="true"></div><div class="power-meter" aria-label="投掷力度"><i class="power-zone" style="left:${55 - half}%;width:${half * 2}%"></i><span id="powerNeedle"></span></div><button class="mini-command throw-command" id="throwCommand">投出${play.label}</button><div class="drag-count" id="throwCount">0 / ${rounds}</div>`);
  const command = $("#throwCommand");
  const needle = $("#powerNeedle");
  const meterStep = miniSpeed(3);
  let strength = 0;
  let direction = 1;
  let retrieves = 0;
  const startMeter = () => {
    clearInterval(miniGameTimer);
    miniGameTimer = setInterval(() => {
      strength += direction * meterStep;
      if (strength >= 100 || strength <= 0) { strength = clamp(strength, 0, 100); direction *= -1; }
      // Percentages on translateX are relative to the needle's own width. Use
      // left for the track position so the indicator traverses the full meter.
      needle.style.left = `${strength}%`;
      needle.style.transform = "translateX(-50%)";
    }, 34);
  };
  const attempt = () => {
    if (command.disabled) return;
    if (Math.abs(strength - 55) > half) {
      playFoley("miss");
      setMiniProgress(retrieves / rounds, strength < 55 ? "力度太轻，道具落在了脚边。" : "力度太大，伙伴判断后没有追出安全区。" );
      return;
    }
    command.disabled = true;
    clearInterval(miniGameTimer);
    playFoley("throw");
    const target = document.createElement("div");
    target.className = "play-goal active throw-target";
    target.style.left = `${25 + strength * .58}%`;
    target.style.top = `${24 + (retrieves % 2) * 18}%`;
    target.textContent = "落点";
    const prop = document.createElement("button");
    prop.className = "drag-item ball throw-prop";
    prop.style.left = "14%";
    prop.style.top = "70%";
    prop.innerHTML = `<img src="${play.asset}" alt="" draggable="false" />`;
    canvas.append(target, prop);
    if (window.gsap && !reducedMotion()) gsap.to(prop, { left: target.style.left, top: target.style.top, rotation: 240, duration: .65, ease: "power2.out", onComplete: () => playFoley("land") });
    miniTimeout(() => playFetchSequence(petId, prop, target, () => {
      retrieves += 1;
      registerMiniHit();
      $("#throwCount").textContent = `${retrieves} / ${rounds}`;
      prop.remove(); target.remove();
      setMiniProgress(retrieves / rounds, retrieves < rounds ? `${miniComboNote()}它准确找到落点并带回来了，再投一次。` : `${rounds} 次召回都配合得很好。` );
      if (retrieves >= rounds) miniTimeout(finishActiveGame, 520);
      else { strength = 0; direction = 1; command.disabled = false; startMeter(); command.focus({ preventScroll: true }); }
    }), 720);
  };
  command.addEventListener("click", attempt);
  startMeter();
  command.focus({ preventScroll: true });
}

function buildBurrowGame(petId) {
  const canvas = miniCanvas();
  const basePet = $("#miniPet");
  basePet?.classList.add("board-base-hidden");
  basePet?.setAttribute("aria-hidden", "true");
  const cols = 7;
  const rows = 4;
  const blocked = new Set(["1,1", "3,0", "3,2", "5,1"]);
  const rounds = miniRounds(3, 6);
  const seeds = new Set(["2,0", "4,2", "6,3", "4,0", "6,1", "2,3"].slice(0, rounds));
  const cells = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const key = `${col},${row}`;
      const type = blocked.has(key) ? "wall" : seeds.has(key) ? "seed" : "path";
      cells.push(`<div class="burrow-cell ${type}" data-burrow-cell="${key}">${type === "seed" ? `<img src="assets/props/hamster-food.webp" alt="籽粮" draggable="false" />` : ""}</div>`);
    }
  }
  canvas.insertAdjacentHTML("beforeend", `<div class="burrow-board" id="burrowBoard" tabindex="0" role="application" aria-label="使用方向键或滑动带领伙伴穿过地道"><div class="burrow-grid">${cells.join("")}</div><div class="burrow-token" id="burrowToken"><img src="${petFramePath(petId, "idle", 0)}" alt="${petById(petId).name}" draggable="false" /></div></div><div class="burrow-controls" aria-label="地道方向控制"><button type="button" data-burrow-dir="up" aria-label="向上">↑</button><span><button type="button" data-burrow-dir="left" aria-label="向左">←</button><button type="button" data-burrow-dir="down" aria-label="向下">↓</button><button type="button" data-burrow-dir="right" aria-label="向右">→</button></span></div><div class="drag-count" id="burrowCount">0 / ${rounds}</div>`);
  const board = $("#burrowBoard");
  const grid = canvas.querySelector(".burrow-grid");
  const token = $("#burrowToken");
  const count = $("#burrowCount");
  const prompt = $("#miniInstruction");
  let col = 0;
  let row = 3;
  let collected = 0;
  let startPoint = null;
  const paint = () => {
    const gridRect = grid.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    const cellW = gridRect.width / cols;
    const cellH = gridRect.height / rows;
    token.style.left = `${gridRect.left - boardRect.left + col * cellW + cellW / 2 - token.offsetWidth / 2}px`;
    token.style.top = `${gridRect.top - boardRect.top + row * cellH + cellH / 2 - token.offsetHeight / 2}px`;
    const current = canvas.querySelector(`[data-burrow-cell="${col},${row}"]`);
    current?.classList.add("visited");
  };
  const move = direction => {
    const offsets = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    const [dx, dy] = offsets[direction] || [0, 0];
    const nextCol = col + dx;
    const nextRow = row + dy;
    const key = `${nextCol},${nextRow}`;
    if (nextCol < 0 || nextCol >= cols || nextRow < 0 || nextRow >= rows || blocked.has(key)) {
      prompt.textContent = "地道被堵住了，换一条路线。";
      playFoley("miss");
      cueInteractive(board);
      return;
    }
    col = nextCol;
    row = nextRow;
    paint();
    playFoley("step");
    showMiniPetPose(petId, "play");
    if (seeds.has(key)) {
      seeds.delete(key);
      const seed = canvas.querySelector(`[data-burrow-cell="${key}"]`);
      seed?.classList.remove("seed");
      seed?.classList.add("collected");
      const image = seed?.querySelector("img");
      image?.remove();
      collected += 1;
      registerMiniHit();
      count.textContent = `${collected} / ${rounds}`;
      setMiniProgress(collected / rounds, collected < rounds ? `${miniComboNote()}籽粮收好啦，继续沿地道寻找下一颗。` : `${rounds} 颗籽粮都藏进颊囊旁了。` );
      playFoley("rustle");
      if (collected >= rounds) miniTimeout(finishActiveGame, 720);
    }
  };
  board.addEventListener("keydown", event => {
    const directions = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right" };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    move(direction);
  });
  board.addEventListener("pointerdown", event => { startPoint = { x: event.clientX, y: event.clientY }; board.setPointerCapture?.(event.pointerId); });
  board.addEventListener("pointerup", event => {
    if (!startPoint) return;
    const dx = event.clientX - startPoint.x;
    const dy = event.clientY - startPoint.y;
    startPoint = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
    move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
  });
  board.addEventListener("pointercancel", () => { startPoint = null; });
  canvas.querySelectorAll("[data-burrow-dir]").forEach(button => button.addEventListener("click", () => move(button.dataset.burrowDir)));
  paint();
  setMiniProgress(0, `用方向键或滑动穿过地道，避开堵塞，收集 ${rounds} 颗籽粮。` );
  board.focus({ preventScroll: true });
}

function buildMemoryGame(petId) {
  const canvas = miniCanvas();
  const symbols = ["icon-paw", "icon-heart", "icon-note", "icon-cross", "care-wash", "care-cuddle"];
  const sequenceVariants = [[0, 3, 1, 4, 2, 5, 3], [2, 5, 0, 4, 1, 3, 0], [1, 4, 3, 5, 0, 2, 4], [5, 2, 4, 0, 3, 1, 2]];
  const sequence = sequenceVariants[miniGameVariant("memory-sequence", sequenceVariants.length)].slice(0, miniRounds(4, 7));
  canvas.insertAdjacentHTML("beforeend", `<div class="memory-board" id="memoryBoard" role="group" aria-label="影子记忆卡牌">${symbols.map((symbol, index) => `<button type="button" class="memory-card" data-memory-index="${index}" aria-label="记忆卡 ${index + 1}"><svg aria-hidden="true"><use href="assets/sprites.svg#${symbol}"></use></svg></button>`).join("")}</div><div class="drag-count" id="memoryCount">0 / ${sequence.length}</div>`);
  const board = $("#memoryBoard");
  const cards = [...board.querySelectorAll(".memory-card")];
  const count = $("#memoryCount");
  let step = 0;
  let accepting = false;
  const reveal = index => {
    const card = cards[index];
    if (!card) return;
    card.classList.add("revealed");
    miniTimeout(() => card.isConnected && card.classList.remove("revealed"), 460);
  };
  const revealGap = miniDelay(560);
  sequence.forEach((index, order) => miniTimeout(() => reveal(index), 600 + order * revealGap));
  miniTimeout(() => { accepting = true; setMiniProgress(0, `影子顺序记住了吗？按刚才的顺序回应 ${sequence.length} 次。` ); cards[sequence[0]]?.focus({ preventScroll: true }); }, 600 + sequence.length * revealGap);
  const choose = index => {
    if (!accepting) return;
    if (index !== sequence[step]) {
      accepting = false;
      step = 0;
      setMiniProgress(0, "顺序错了，影子重新出现，仔细记住它们的路线。" );
      playFoley("miss");
      cards.forEach(card => card.classList.remove("revealed"));
      sequence.forEach((value, order) => miniTimeout(() => reveal(value), 500 + order * revealGap));
      miniTimeout(() => { accepting = true; cards[sequence[0]]?.focus({ preventScroll: true }); }, 500 + sequence.length * revealGap);
      return;
    }
    cards[index].classList.add("matched");
    miniTimeout(() => cards[index].isConnected && cards[index].classList.remove("matched"), 360);
    step += 1;
    registerMiniHit();
    count.textContent = `${step} / ${sequence.length}`;
    setMiniProgress(step / sequence.length, step < sequence.length ? `${miniComboNote()}回应正确，继续记住下一个影子。` : `${sequence.length} 个影子都回应正确了。` );
    playFoley("tap");
    if (step >= sequence.length) { accepting = false; miniTimeout(finishActiveGame, 620); }
    else cards[sequence[step]]?.focus({ preventScroll: true });
  };
  cards.forEach(card => card.addEventListener("click", () => choose(Number(card.dataset.memoryIndex))));
  setMiniProgress(0, `先观察 ${sequence.length} 个影子的出现顺序，随后按相同顺序回应。` );
}

function buildMatch3Game(petId) {
  const canvas = miniCanvas();
  const contextId = activeGameContext?.event?.id || activeGameContext?.activity?.id || activeGameContext?.game?.id || "";
  const isMarket = contextId.startsWith("market-");
  const profile = isMarket
    ? { theme: "market", title: "补给入库台", objective: "把相同物资连成三消，完成今天的分类入库。", kinds: [{ id: "coin", icon: "icon-coin", label: "标签" }, { id: "snack", icon: "care-snack", label: "饲料" }, { id: "wash", icon: "care-wash", label: "洗护" }] }
    : { theme: "clinic", title: "护理记录台", objective: "把相同护理标记连成三消，归档今天的检查记录。", kinds: [{ id: "cross", icon: "icon-cross", label: "检查" }, { id: "heart", icon: "icon-heart", label: "安抚" }, { id: "wash", icon: "care-wash", label: "清洁" }] };
  const kindById = Object.fromEntries(profile.kinds.map(kind => [kind.id, kind]));
  const columns = 5;
  const targetPerKind = miniRounds(3, 6);
  const starterBoard = ["wash", "heart", "wash", "heart", "wash", "cross", "cross", "heart", "wash", "heart", "heart", "wash", "cross", "cross", "wash", "wash", "heart", "wash", "heart", "cross", "heart", "wash", "heart", "wash", "cross"];
  const mappedStarter = starterBoard.map((kind, index) => profile.kinds.find(item => item.id === kind)?.id || profile.kinds[index % profile.kinds.length].id);
  canvas.insertAdjacentHTML("beforeend", `<section class="match3-stage theme-${profile.theme}" aria-label="${profile.title}"><div class="match3-stage-copy"><small>三消整理</small><b>${profile.title}</b><span id="match3Hint">交换相邻方块，凑成三个相同标记。</span></div><div class="match3-goals" id="match3Goals" aria-label="本轮目标">${profile.kinds.map(kind => `<span data-match-goal="${kind.id}"><svg aria-hidden="true"><use href="assets/sprites.svg#${kind.icon}"></use></svg><b>0</b><small>/ ${targetPerKind}</small><em>${kind.label}</em></span>`).join("")}</div><div class="match3-board" id="match3Board" role="group" aria-label="${profile.title}三消棋盘"></div><div class="match3-footer"><span id="match3Count">已整理 0 / ${targetPerKind * profile.kinds.length}</span><span id="match3Chain">连锁 0</span></div></section>`);
  const board = $("#match3Board");
  const count = $("#match3Count");
  const hint = $("#match3Hint");
  const chain = $("#match3Chain");
  if (miniGameSession) miniGameSession.rounds = targetPerKind;
  let boardState = [...mappedStarter];
  let selected = null;
  let resolving = false;
  let refillCursor = 0;
  const progress = Object.fromEntries(profile.kinds.map(kind => [kind.id, 0]));
  const adjacent = (first, second) => Math.abs(first - second) === 1 && Math.floor(first / columns) === Math.floor(second / columns) || Math.abs(first - second) === columns;
  const matchedIndexes = values => {
    const matched = new Set();
    for (let row = 0; row < values.length / columns; row += 1) {
      let start = row * columns;
      for (let column = 1; column <= columns; column += 1) {
        const index = row * columns + column;
        if (column < columns && values[index] === values[start]) continue;
        if (column - (start % columns) >= 3) for (let item = start; item < index; item += 1) matched.add(item);
        start = index;
      }
    }
    for (let column = 0; column < columns; column += 1) {
      let start = column;
      for (let row = 1; row <= values.length / columns; row += 1) {
        const index = row * columns + column;
        if (row < values.length / columns && values[index] === values[start]) continue;
        if ((index - start) / columns >= 3) for (let item = start; item < index; item += columns) matched.add(item);
        start = index;
      }
    }
    return matched;
  };
  const hasMove = values => values.some((_, index) => [index + 1, index + columns].some(next => {
    if (next >= values.length || !adjacent(index, next)) return false;
    [values[index], values[next]] = [values[next], values[index]];
    const valid = matchedIndexes(values).size > 0;
    [values[index], values[next]] = [values[next], values[index]];
    return valid;
  }));
  const updateGoals = () => {
    profile.kinds.forEach(kind => { const goal = $(`[data-match-goal="${kind.id}"]`); if (goal) goal.querySelector("b").textContent = String(progress[kind.id]); });
    const total = Object.values(progress).reduce((sum, value) => sum + value, 0);
    count.textContent = `已整理 ${total} / ${targetPerKind * profile.kinds.length}`;
    setMiniProgress(total / (targetPerKind * profile.kinds.length), total ? "记录已更新，继续寻找可以三消的相邻标记。" : profile.objective);
  };
  const renderBoard = () => {
    board.innerHTML = boardState.map((kind, index) => {
      const item = kindById[kind];
      return `<button type="button" class="match3-tile kind-${kind}" data-match-index="${index}" data-match-kind="${kind}" aria-label="${item.label}标记 ${index + 1}"><svg aria-hidden="true"><use href="assets/sprites.svg#${item.icon}"></use></svg></button>`;
    }).join("");
    board.querySelectorAll(".match3-tile").forEach(tile => tile.addEventListener("click", () => choose(Number(tile.dataset.matchIndex))));
  };
  const nextKind = (index, values) => {
    for (let attempt = 0; attempt < profile.kinds.length; attempt += 1) {
      const kind = profile.kinds[(refillCursor + attempt) % profile.kinds.length].id;
      const probe = [...values];
      probe[index] = kind;
      if (!matchedIndexes(probe).has(index)) { refillCursor += attempt + 1; return kind; }
    }
    return profile.kinds[(refillCursor += 1) % profile.kinds.length].id;
  };
  const resolveMatch = matches => {
    resolving = true;
    const tiles = [...board.querySelectorAll(".match3-tile")];
    matches.forEach(index => tiles[index]?.classList.add("clearing"));
    const clearedKinds = [...matches].map(index => boardState[index]);
    const gained = clearedKinds.reduce((sum, kind) => {
      if (progress[kind] >= targetPerKind) return sum;
      progress[kind] += 1;
      return sum + 1;
    }, 0);
    const combo = registerMiniHit();
    chain.textContent = `连锁 ${combo}`;
    hint.textContent = matches.size > 3 ? "漂亮的连锁消除，护理记录一次推进更多。" : "消除成功，新的标记正在落入记录台。";
    playFoley("success");
    miniTimeout(() => {
      matches.forEach(index => { boardState[index] = nextKind(index, boardState); });
      if (!hasMove(boardState)) boardState = [...mappedStarter];
      renderBoard();
      updateGoals();
      resolving = false;
      selected = null;
      if (gained && Object.values(progress).every(value => value >= targetPerKind)) {
        hint.textContent = "三类记录全部归档，伙伴的检查配合得很好。";
        miniTimeout(finishActiveGame, 560);
      }
    }, 300);
  };
  const choose = index => {
    if (resolving) return;
    const tiles = [...board.querySelectorAll(".match3-tile")];
    if (selected === null) {
      selected = index;
      tiles[index]?.classList.add("selected");
      hint.textContent = "再选择一个相邻标记进行交换。";
      return;
    }
    if (selected === index) { tiles[index]?.classList.remove("selected"); selected = null; hint.textContent = profile.objective; return; }
    if (!adjacent(selected, index)) {
      tiles[selected]?.classList.remove("selected");
      selected = index;
      tiles[index]?.classList.add("selected");
      hint.textContent = "只能交换相邻标记，重新选择一个旁边的方块。";
      return;
    }
    const first = selected;
    [boardState[first], boardState[index]] = [boardState[index], boardState[first]];
    renderBoard();
    const matches = matchedIndexes(boardState);
    if (!matches.size) {
      [boardState[first], boardState[index]] = [boardState[index], boardState[first]];
      renderBoard();
      selected = null;
      hint.textContent = "这次没有形成三消，换一个相邻位置试试。";
      playFoley("miss");
      return;
    }
    resolveMatch(matches);
  };
  renderBoard();
  updateGoals();
  board.querySelector(".match3-tile")?.focus({ preventScroll: true });
}

function buildTrailGame(petId) {
  const canvas = miniCanvas();
  const basePet = $("#miniPet");
  basePet?.classList.add("board-base-hidden");
  basePet?.setAttribute("aria-hidden", "true");
  // 两位伙伴共用这块棋盘，但规则不同：犬类读风向绕开落石，兔子必须权衡暴露在开阔地的风险。
  const profile = petId === "rabbit"
    ? {
      cols: 5, rows: 4, start: [0, 3], base: 4, max: 6,
      route: [[1, 2], [3, 3], [4, 1], [2, 0], [0, 0], [4, 3]],
      blocked: ["2,2", "3,1"],
      risky: ["1,1", "2,1", "3,0", "1,3", "4,2"],
      beaconGlyph: "❉",
      label: "滑动或使用方向按钮规划遮蔽路线",
      countLabel: "个遮蔽点",
      opening: "开阔地会暴露行踪，尽量沿草丛遮蔽处抵达每个安全点。",
      progressNote: "遮蔽点确认，继续沿草丛前进。",
      finishNote: "遮蔽路线走完了，团子一路都没有暴露。",
      blockedNote: "这里是密实的荆棘丛，绕开它。"
    }
    : {
      cols: 5, rows: 3, start: [0, 2], base: 3, max: 5,
      route: [[1, 1], [3, 0], [4, 2], [4, 0], [0, 0]],
      blocked: ["2,1", "3,2", "2,2"],
      risky: [],
      beaconGlyph: "◆",
      label: "滑动或使用方向按钮规划高地路线",
      countLabel: "个路标",
      opening: "根据风向和路标规划路线，带伙伴安全抵达高地观测点。",
      progressNote: "路标确认，沿风向前往下一个高地标记。",
      finishNote: "安全路线确认完成，可以返回山谷。",
      blockedNote: "风向不稳，这条路被落石挡住了。"
    };
  const cols = profile.cols;
  const rows = profile.rows;
  const rounds = miniRounds(profile.base, profile.max);
  const route = profile.route.slice(0, rounds);
  const blocked = new Set(profile.blocked);
  const risky = new Set(profile.risky.filter(key => !route.some(([col, row]) => `${col},${row}` === key)));
  const beacons = new Set(route.map(([col, row]) => `${col},${row}`));
  const cells = [];
  for (let row = 0; row < rows; row += 1) for (let col = 0; col < cols; col += 1) {
    const key = `${col},${row}`;
    const kind = blocked.has(key) ? "blocked" : beacons.has(key) ? "beacon" : risky.has(key) ? "risky" : "open";
    cells.push(`<div class="trail-cell ${kind}" data-trail-cell="${key}">${beacons.has(key) ? profile.beaconGlyph : ""}</div>`);
  }
  canvas.insertAdjacentHTML("beforeend", `<div class="trail-board" id="trailBoard" tabindex="0" role="application" data-trail-at="${profile.start.join(",")}" aria-label="${profile.label}"><div class="trail-grid" style="--trail-cols:${cols};--trail-rows:${rows}">${cells.join("")}</div><div class="trail-marker" id="trailMarker"><img src="${petFramePath(petId, "idle", 0)}" alt="${petById(petId).name}" draggable="false" /></div></div><div class="trail-controls" aria-label="路线方向控制"><button type="button" data-trail-dir="ArrowUp" aria-label="向上">↑</button><span><button type="button" data-trail-dir="ArrowLeft" aria-label="向左">←</button><button type="button" data-trail-dir="ArrowDown" aria-label="向下">↓</button><button type="button" data-trail-dir="ArrowRight" aria-label="向右">→</button></span></div><div class="drag-count" id="trailCount">0 / ${rounds} ${profile.countLabel}</div>`);
  const board = $("#trailBoard");
  const grid = canvas.querySelector(".trail-grid");
  const marker = $("#trailMarker");
  const count = $("#trailCount");
  const controls = [...canvas.querySelectorAll("[data-trail-dir]")];
  let [col, row] = profile.start;
  let next = 0;
  const paint = () => {
    board.dataset.trailAt = `${col},${row}`;
    const gridRect = grid.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    marker.style.left = `${gridRect.left - boardRect.left + (col + .5) * gridRect.width / cols - marker.offsetWidth / 2}px`;
    marker.style.top = `${gridRect.top - boardRect.top + (row + .5) * gridRect.height / rows - marker.offsetHeight / 2}px`;
  };
  const move = direction => {
    const offsets = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
    const [dx, dy] = offsets[direction] || [0, 0];
    const nextCol = col + dx;
    const nextRow = row + dy;
    const key = `${nextCol},${nextRow}`;
    if (nextCol < 0 || nextCol >= cols || nextRow < 0 || nextRow >= rows || blocked.has(key)) { playFoley("miss"); setMiniProgress(next / rounds, profile.blockedNote); return; }
    col = nextCol; row = nextRow; paint(); playFoley("step");
    if (risky.has(key)) {
      canvas.querySelector(`[data-trail-cell="${key}"]`)?.classList.add("exposed");
      playFoley("miss");
      setMiniProgress(next / rounds, "这一格是开阔地，团子暴露了一下，尽快回到草丛。" );
    }
    if (next < route.length && key === `${route[next][0]},${route[next][1]}`) {
      canvas.querySelector(`[data-trail-cell="${key}"]`)?.classList.add("passed");
      next += 1; registerMiniHit(); count.textContent = `${next} / ${rounds} ${profile.countLabel}`;
      setMiniProgress(next / rounds, next < rounds ? `${miniComboNote()}${profile.progressNote}` : profile.finishNote);
      if (next >= rounds) miniTimeout(finishActiveGame, 680);
    }
  };
  board.addEventListener("keydown", event => { if (!Object.prototype.hasOwnProperty.call({ ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1, ArrowRight: 1, w: 1, a: 1, s: 1, d: 1 }, event.key)) return; event.preventDefault(); move(event.key); });
  let swipeStart = null;
  board.addEventListener("pointerdown", event => {
    swipeStart = { x: event.clientX, y: event.clientY };
    board.setPointerCapture?.(event.pointerId);
  });
  board.addEventListener("pointerup", event => {
    if (!swipeStart) return;
    const dx = event.clientX - swipeStart.x;
    const dy = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "ArrowRight" : "ArrowLeft") : (dy > 0 ? "ArrowDown" : "ArrowUp"));
  });
  board.addEventListener("pointercancel", () => { swipeStart = null; });
  controls.forEach(button => button.addEventListener("click", () => { move(button.dataset.trailDir); board.focus({ preventScroll: true }); }));
  paint();
  setMiniProgress(0, profile.opening);
  board.focus({ preventScroll: true });
}

function buildTimingGame(petId) {
  const canvas = miniCanvas();
  const rounds = miniRounds(3, 6);
  const half = miniWindow(11);
  canvas.insertAdjacentHTML("beforeend", `<div class="timing-stage"><div class="timing-track"><i style="left:${51 - half}%;width:${half * 2}%"></i><span id="timingNeedle"></span></div><button type="button" class="mini-command timing-command" id="timingCommand">按下信号</button><div class="drag-count" id="timingCount">0 / ${rounds} 次</div></div>`);
  const needle = $("#timingNeedle");
  const command = $("#timingCommand");
  const count = $("#timingCount");
  let value = 0;
  let direction = 1;
  let hits = 0;
  const needleSpeed = miniSpeed(3.1 + miniGameVariant("timing-speed", 3) * .45);
  miniGameTimer = setInterval(() => {
    value += direction * needleSpeed;
    if (value >= 100 || value <= 0) { value = clamp(value, 0, 100); direction *= -1; }
    // Keep the timing needle aligned to the track, not to its own width.
    needle.style.left = `${value}%`;
    needle.style.transform = "translateX(-50%)";
  }, 32);
  command.addEventListener("click", () => {
    if (Math.abs(value - 51) > half) { playFoley("miss"); setMiniProgress(hits / rounds, "信号偏早或偏晚，等指针进入黄色区再按。" ); return; }
    hits += 1;
    registerMiniHit();
    count.textContent = `${hits} / ${rounds} 次`;
    playFoley("tap");
    setMiniProgress(hits / rounds, hits < rounds ? `${miniComboNote()}信号对上了，继续完成下一次确认。` : `${rounds} 次信号都准确对齐。` );
    if (hits >= rounds) { clearInterval(miniGameTimer); miniTimeout(finishActiveGame, 600); }
  });
  setMiniProgress(0, `${petById(petId).name}等待信号窗口，指针进入黄色区时按下，共 ${rounds} 次。` );
  command.focus({ preventScroll: true });
}

function buildChoiceGame(petId) {
  const canvas = miniCanvas();
  const meadow = petId === "rabbit";
  const scenarios = meadow
    ? [
      { prompt: "前方是湿泥和矮草。团子停下来嗅了嗅地面。", options: ["走湿泥抄近路", "沿矮草绕开泥坑", "停在原地跺脚"], correct: 1 },
      { prompt: "左侧花丛有沙沙声，右侧是开阔地。", options: ["冲进开阔地", "贴着花丛边缘过去", "对着声音叫喊"], correct: 1 },
      { prompt: "一条细径被落叶盖住，旁边是被踩实的土路。", options: ["走被盖住的细径", "走踩实的土路", "原路退回"], correct: 0 },
      { prompt: "高地风变大，眼前有石缝和空地。", options: ["穿过石缝躲避", "站在空地看风景", "逆风奔跑"], correct: 0 },
      { prompt: "水边木桩松动，旁边还有一排稳固的草墩。", options: ["跳上松动木桩", "沿草墩绕过去", "直接涉水"], correct: 1 },
      { prompt: "训练场边缘有人靠近，团子耳朵贴平。", options: ["冲向人群", "改走内侧遮蔽带", "停下来观望很久"], correct: 1 }
    ]
    : [
    { prompt: "访客停在饮水盆边，身体放松但还没有靠近。", options: ["保持距离观察", "立刻伸手抱起", "大声呼唤伙伴"], correct: 0 },
    { prompt: "访客突然抬头，羽毛贴紧身体，附近有脚步声。", options: ["把食物推过去", "退后并降低声音", "追到篱笆边查看"], correct: 1 },
    { prompt: "访客转向出口，停下来回望一次。", options: ["清出离开的通道", "用玩具拦住它", "连续点击吸引它"], correct: 0 },
    { prompt: "访客把前爪搭在门槛上，尾巴低垂却在轻轻摆动。", options: ["直接抱进室内", "蹲低身体侧向等待", "关上门减少刺激"], correct: 1 },
    { prompt: "访客一直躲在草丛阴影里，只露出耳朵朝向你。", options: ["放下食物后退开", "拨开草丛看清楚", "用玩具声音催促"], correct: 0 },
    { prompt: "访客开始整理毛发，呼吸平稳，愿意留在原地。", options: ["立即抱起送医", "记录状态并慢慢靠近", "呼叫其他伙伴围观"], correct: 1 }
  ];
  const rounds = miniRounds(3, 6);
  const variant = miniGameVariant("choice-order", scenarios.length);
  const order = Array.from({ length: rounds }, (_, index) => (index + variant) % scenarios.length);
  canvas.insertAdjacentHTML("beforeend", `<section class="choice-stage${meadow ? " is-meadow" : ""}" aria-label="${meadow ? "草径抉择" : "情境决策"}"><div class="choice-stage-head"><div><small>${meadow ? "草径判断" : "动物信号"}</small><b id="choiceRound">第 1 / ${rounds} 轮</b></div><span id="choiceMood">${meadow ? "选最安全的落脚处" : "观察情绪，再决定下一步"}</span></div><p id="choicePrompt"></p><div class="choice-options" role="group" aria-label="处理方案"></div></section>`);
  const prompt = $("#choicePrompt");
  const round = $("#choiceRound");
  const mood = $("#choiceMood");
  const options = canvas.querySelector(".choice-options");
  let step = 0;
  const render = () => {
    const scenario = scenarios[order[step]];
    prompt.textContent = scenario.prompt;
    round.textContent = `第 ${step + 1} / ${rounds} 轮`;
    mood.textContent = step === 0 ? `${petById(petId).name}等待你的判断` : `${miniComboNote()}上一轮处理让它更愿意配合了`;
    options.innerHTML = scenario.options.map((label, index) => `<button type="button" class="choice-option" data-choice-index="${index}" data-choice-correct="${index === scenario.correct}"><span>${String.fromCharCode(65 + index)}</span><b>${label}</b></button>`).join("");
    options.querySelector(".choice-option")?.focus({ preventScroll: true });
    options.querySelectorAll(".choice-option").forEach(button => button.addEventListener("click", () => choose(Number(button.dataset.choiceIndex), scenario.correct)));
    setMiniProgress(step / rounds, "先读懂动物信号，再选择风险最低的处理方式。" );
  };
  const choose = (index, correct) => {
    if (index !== correct) {
      registerMiniMiss();
      mood.textContent = "这个动作会增加压力，换一个更安静的方案。";
      playFoley("miss");
      cueInteractive(options.querySelector(`[data-choice-index="${correct}"]`));
      return;
    }
    playFoley("success");
    showMiniPetPose(petId, step % 2 ? "affection" : "play");
    step += 1;
    registerMiniHit();
    if (step >= rounds) {
      setMiniProgress(1, `${rounds} 轮判断都保护了访客的安全距离。` );
      miniTimeout(finishActiveGame, 520);
      return;
    }
    render();
  };
  render();
}

function buildSortGame(petId) {
  const canvas = miniCanvas();
  const catalog = {
    food: { label: "食物箱", icon: "care-snack", tone: "gold" },
    care: { label: "护理箱", icon: "icon-cross", tone: "blue" },
    play: { label: "玩具箱", icon: "icon-paw", tone: "green" }
  };
  const baseQueue = ["food", "care", "play", "care", "play", "food"];
  const offset = miniGameVariant("sort-queue", baseQueue.length);
  const queue = Array.from({ length: miniRounds(6, 12, 2) }, (_, index) => baseQueue[(index + offset) % baseQueue.length]);
  canvas.insertAdjacentHTML("beforeend", `<section class="sort-stage" data-sort-queue="${queue.length}" aria-label="物资分拣"><div class="sort-stage-head"><div><small>集市入库</small><b>按标签分拣物资</b><span id="sortHint">先选择一件待入库物资。</span></div><strong id="sortCount">0 / ${queue.length}</strong></div><div class="sort-queue" id="sortQueue" role="list" aria-label="待分拣物资"></div><div class="sort-bins" role="group" aria-label="物资类别箱"><button type="button" class="sort-bin bin-gold" data-sort-bin="food"><svg aria-hidden="true"><use href="assets/sprites.svg#care-snack"></use></svg><b>食物箱</b></button><button type="button" class="sort-bin bin-blue" data-sort-bin="care"><svg aria-hidden="true"><use href="assets/sprites.svg#icon-cross"></use></svg><b>护理箱</b></button><button type="button" class="sort-bin bin-green" data-sort-bin="play"><svg aria-hidden="true"><use href="assets/sprites.svg#icon-paw"></use></svg><b>玩具箱</b></button></div></section>`);
  const queueElement = $("#sortQueue");
  const hint = $("#sortHint");
  const count = $("#sortCount");
  let cursor = 0;
  let selected = null;
  const itemName = { food: "新鲜饲料", care: "护理用品", play: "活动玩具" };
  const renderQueue = () => {
    queueElement.innerHTML = queue.map((kind, index) => `<button type="button" class="sort-item ${index < cursor ? "sorted" : ""} ${index === cursor ? "active" : ""}" data-sort-index="${index}" data-sort-kind="${kind}" ${index !== cursor ? "disabled" : ""}><svg aria-hidden="true"><use href="assets/sprites.svg#${catalog[kind].icon}"></use></svg><b>${itemName[kind]}</b><small>标签 ${index + 1}</small></button>`).join("");
    queueElement.querySelector(".sort-item.active")?.focus({ preventScroll: true });
    queueElement.querySelectorAll(".sort-item.active").forEach(button => button.addEventListener("click", () => {
      selected = queue[Number(button.dataset.sortIndex)];
      hint.textContent = `已选${itemName[selected]}，点击它应该进入的木箱。`;
      document.querySelectorAll(".sort-bin").forEach(bin => bin.classList.toggle("ready", true));
    }));
  };
  const place = bin => {
    if (selected === null) { hint.textContent = "先选择一件待入库物资。"; registerMiniMiss(); playFoley("miss"); return; }
    if (bin !== selected) { hint.textContent = `分类不对，${itemName[selected]}不属于这个箱子。`; registerMiniMiss(); playFoley("miss"); cueInteractive(document.querySelector(`[data-sort-bin="${selected}"]`)); return; }
    cursor += 1;
    registerMiniHit();
    selected = null;
    document.querySelectorAll(".sort-bin").forEach(item => item.classList.remove("ready"));
    count.textContent = `${cursor} / ${queue.length}`;
    playFoley("success");
    setMiniProgress(cursor / queue.length, cursor < queue.length ? `${miniComboNote()}标签核对正确，继续处理下一件物资。` : `${queue.length} 件物资都已进入正确的木箱。` );
    if (cursor >= queue.length) { miniTimeout(finishActiveGame, 520); return; }
    hint.textContent = "下一件物资已经标记出来了。";
    renderQueue();
  };
  canvas.querySelectorAll("[data-sort-bin]").forEach(bin => bin.addEventListener("click", () => place(bin.dataset.sortBin)));
  renderQueue();
  setMiniProgress(0, "先选择一件物资，再按类别放入对应木箱。" );
}

/** 团子专属：在混杂的草丛里只采安全草叶，有毒的必须整株跳过。 */
function buildForageGame(petId) {
  const canvas = miniCanvas();
  const pet = petById(petId);
  const safeKinds = [
    { id: "clover", name: "三叶草", note: "叶缘光滑" },
    { id: "dandelion", name: "蒲公英", note: "锯齿叶片" },
    { id: "plantain", name: "车前草", note: "平行叶脉" },
    { id: "oat", name: "燕麦草", note: "细长叶尖" }
  ];
  const toxicKinds = [
    { id: "foxglove", name: "毛地黄", note: "叶背绒毛" },
    { id: "hemlock", name: "野芹", note: "空心茎干" },
    { id: "fern", name: "蕨芽", note: "卷曲新芽" },
    { id: "buttercup", name: "毛茛", note: "蜡质光泽" }
  ];
  const safeTotal = miniRounds(4, 8);
  const toxicTotal = clamp(1 + Math.floor(miniTier().tier / 2), 1, 3);
  const offset = miniGameVariant("forage-patch", safeKinds.length);
  const leaves = [
    ...Array.from({ length: safeTotal }, (_, index) => ({ ...safeKinds[(index + offset) % safeKinds.length], safe: true })),
    ...Array.from({ length: toxicTotal }, (_, index) => ({ ...toxicKinds[(index + offset) % toxicKinds.length], safe: false }))
  ]
    .map((leaf, index) => ({ leaf, order: hashGameSeed(`${offset}:${index}:${leaf.id}`) }))
    .sort((first, second) => first.order - second.order)
    .map(entry => entry.leaf);
  const safeNames = [...new Set(leaves.filter(leaf => leaf.safe).map(leaf => leaf.name))];
  canvas.insertAdjacentHTML("beforeend", `<section class="forage-stage" aria-label="草叶取舍"><div class="forage-legend"><small>今天可以吃的</small><b>${safeNames.join(" · ")}</b><span>其余草叶留在原地，${pet.name}会记住你的判断。</span></div><div class="forage-patch" id="foragePatch" role="group" aria-label="草丛里的草叶">${leaves.map((leaf, index) => `<button type="button" class="forage-leaf" data-forage-index="${index}" data-forage-safe="${leaf.safe}" data-forage-kind="${leaf.id}" aria-label="${leaf.name}，${leaf.note}"><i aria-hidden="true"></i><b>${leaf.name}</b><small>${leaf.note}</small></button>`).join("")}</div><div class="drag-count" id="forageCount">0 / ${safeTotal} 株</div></section>`);
  const count = $("#forageCount");
  let picked = 0;
  const pick = button => {
    const index = Number(button.dataset.forageIndex);
    const leaf = leaves[index];
    if (!leaf || button.classList.contains("picked") || button.classList.contains("flagged")) return;
    if (!leaf.safe) {
      button.classList.add("flagged");
      playFoley("miss");
      setMiniProgress(picked / safeTotal, `${leaf.name}有${leaf.note}，${pet.name}退了一步，这株要留下。`);
      return;
    }
    button.classList.add("picked");
    button.disabled = true;
    picked += 1;
    registerMiniHit();
    count.textContent = `${picked} / ${safeTotal} 株`;
    playFoley("chew");
    showMiniPetPose(petId, picked % 2 ? "eat" : "affection");
    setMiniProgress(picked / safeTotal, picked < safeTotal ? `${miniComboNote()}这株可以吃，继续在草丛里挑安全的。` : `${safeTotal} 株安全草叶都采完了，有毒的都留在原地。`);
    if (picked >= safeTotal) miniTimeout(finishActiveGame, 560);
  };
  canvas.querySelectorAll("[data-forage-index]").forEach(button => button.addEventListener("click", () => pick(button)));
  setMiniProgress(0, `按名牌辨认草叶，只采清单上的 ${safeTotal} 株，有毒的整株跳过。`);
  canvas.querySelector(".forage-leaf")?.focus({ preventScroll: true });
}

/** 布丁专属：颊囊和储藏格都有容量上限，籽粮要按体积分配，塞不下会掉出来。 */
function buildStashGame(petId) {
  const canvas = miniCanvas();
  const pet = petById(petId);
  const seedTotal = miniRounds(5, 9);
  const pouchCount = miniTier().tier >= 3 ? 3 : 2;
  const sizeCycle = [1, 2, 3, 2, 1, 3, 2, 1, 3];
  const offset = miniGameVariant("stash-seeds", sizeCycle.length);
  const seedNames = { 1: "小米粒", 2: "南瓜籽", 3: "榛子块" };
  const seeds = Array.from({ length: seedTotal }, (_, index) => sizeCycle[(index + offset) % sizeCycle.length]);
  const pouchNames = ["左颊囊", "右颊囊", "巢边储藏格"];
  // 容量按轮流装填算出来，只多留一格：分配需要动脑，塞错了也能把籽粮取出来重放。
  const pouches = Array.from({ length: pouchCount }, (_, index) => ({
    id: `pouch-${index}`,
    label: pouchNames[index],
    capacity: seeds.reduce((total, size, seedIndex) => total + (seedIndex % pouchCount === index ? size : 0), 0) + 1,
    stored: []
  }));
  canvas.insertAdjacentHTML("beforeend", `<section class="stash-stage" aria-label="颊囊囤粮"><div class="stash-head"><div><small>体积分配</small><b id="stashSeed" data-stash-size="0">准备第一颗籽粮</b><span id="stashHint">先看体积，再决定放进哪一格。</span></div><strong id="stashCount">0 / ${seedTotal}</strong></div><div class="stash-pouches" id="stashPouches" role="group" aria-label="颊囊与储藏格">${pouches.map((pouch, index) => `<div class="stash-pouch" data-stash-pouch="${index}" data-stash-remaining="${pouch.capacity}"><button type="button" class="stash-drop" data-stash-drop="${index}" aria-label="把当前籽粮放进${pouch.label}"><b>${pouch.label}</b><small><em data-stash-used="${index}">0</em> / ${pouch.capacity} 格</small></button><div class="stash-slots" data-stash-slots="${index}" aria-label="${pouch.label}里的籽粮"></div></div>`).join("")}</div><p class="stash-note">塞不下的籽粮会掉出来；点击已经装好的籽粮可以取出重放。</p></section>`);
  const seedLabel = $("#stashSeed");
  const hint = $("#stashHint");
  const count = $("#stashCount");
  const queue = [...seeds];
  const stored = () => seedTotal - queue.length;
  const remaining = index => pouches[index].capacity - pouches[index].stored.reduce((total, size) => total + size, 0);
  const paint = () => {
    pouches.forEach((pouch, index) => {
      const used = pouch.stored.reduce((total, size) => total + size, 0);
      canvas.querySelector(`[data-stash-pouch="${index}"]`).dataset.stashRemaining = String(pouch.capacity - used);
      canvas.querySelector(`[data-stash-used="${index}"]`).textContent = String(used);
      const slots = canvas.querySelector(`[data-stash-slots="${index}"]`);
      slots.innerHTML = pouch.stored.map((size, slot) => `<button type="button" class="stash-chip size-${size}" data-stash-remove="${index}:${slot}" aria-label="取出${seedNames[size]}">${seedNames[size]}</button>`).join("");
      slots.querySelectorAll("[data-stash-remove]").forEach(chip => chip.addEventListener("click", () => remove(chip.dataset.stashRemove)));
    });
    const size = queue[0];
    seedLabel.dataset.stashSize = String(size || 0);
    seedLabel.textContent = size ? `${seedNames[size]}（占 ${size} 格）` : "全部籽粮都收好了";
    count.textContent = `${stored()} / ${seedTotal}`;
  };
  const remove = key => {
    const [pouchIndex, slot] = key.split(":").map(Number);
    const pouch = pouches[pouchIndex];
    const size = pouch.stored[slot];
    if (size === undefined) return;
    pouch.stored.splice(slot, 1);
    queue.unshift(size);
    hint.textContent = `${seedNames[size]}取了出来，重新安排它的位置。`;
    playFoley("rustle");
    paint();
    setMiniProgress(stored() / seedTotal, `取出一颗重新分配，${pet.name}在等你决定。`);
  };
  const store = index => {
    const size = queue[0];
    if (!size) return;
    if (size > remaining(index)) {
      playFoley("miss");
      hint.textContent = `${pouches[index].label}只剩 ${remaining(index)} 格，${seedNames[size]}会掉出来。`;
      cueInteractive(canvas.querySelector(`[data-stash-drop="${index}"]`));
      setMiniProgress(stored() / seedTotal, "这一格塞不下，换一个还有空间的地方。");
      return;
    }
    queue.shift();
    pouches[index].stored.push(size);
    registerMiniHit();
    playFoley("pop");
    hint.textContent = queue.length ? "继续看下一颗籽粮的体积。" : "所有籽粮都进了合适的格子。";
    paint();
    setMiniProgress(stored() / seedTotal, queue.length ? `${miniComboNote()}装得刚好，继续分配下一颗。` : `${seedTotal} 颗籽粮都按体积收好了。`);
    if (!queue.length) miniTimeout(finishActiveGame, 560);
  };
  canvas.querySelectorAll("[data-stash-drop]").forEach(button => button.addEventListener("click", () => store(Number(button.dataset.stashDrop))));
  canvas.querySelector(".stash-stage").addEventListener("keydown", event => {
    const index = Number(event.key) - 1;
    if (Number.isNaN(index) || index < 0 || index >= pouches.length) return;
    event.preventDefault();
    store(index);
  });
  paint();
  setMiniProgress(0, `按体积把 ${seedTotal} 颗籽粮分配到 ${pouchCount} 个格子里，不要超过容量。`);
  canvas.querySelector(".stash-drop")?.focus({ preventScroll: true });
}

/** 米粒专属：音符沿高低轨道滑向判定线，要同时对上音高和时机。 */
function buildSongGame(petId) {
  const canvas = miniCanvas();
  const pet = petById(petId);
  const lanes = [
    { id: "high", label: "高音", note: "抬头长鸣" },
    { id: "mid", label: "中音", note: "平稳应答" },
    { id: "low", label: "低音", note: "低头轻啾" }
  ];
  const phraseVariants = [
    ["mid", "high", "low", "mid", "high", "mid", "low", "high"],
    ["high", "high", "mid", "low", "mid", "high", "low", "mid"],
    ["low", "mid", "high", "high", "low", "mid", "mid", "high"],
    ["mid", "low", "mid", "high", "low", "high", "mid", "low"]
  ];
  const noteTotal = miniRounds(4, 8);
  const phrase = phraseVariants[miniGameVariant("song-phrase", phraseVariants.length)].slice(0, noteTotal);
  const hitLine = 26;
  const tolerance = miniWindow(11);
  const step = miniSpeed(2.6);
  canvas.insertAdjacentHTML("beforeend", `<section class="song-stage" aria-label="音阶跟唱"><div class="song-phrase" id="songPhrase" aria-label="今天的乐句">${phrase.map((lane, index) => `<i data-song-step="${index}" data-song-step-lane="${lane}">${lanes.find(item => item.id === lane).label.slice(0, 1)}</i>`).join("")}</div><div class="song-ladder" id="songLadder">${lanes.map(lane => `<div class="song-lane" data-song-track="${lane.id}"><b>${lane.label}</b><span class="song-hit-line" aria-hidden="true" style="left:${hitLine}%"></span></div>`).join("")}<i class="song-note" id="songNote" data-song-lane="${phrase[0]}" style="left:100%"></i></div><div class="song-keys" role="group" aria-label="音高按键">${lanes.map((lane, index) => `<button type="button" class="song-key" data-song-lane="${lane.id}" aria-label="${lane.label}，${lane.note}"><b>${lane.label}</b><small>${index + 1} 键</small></button>`).join("")}</div><div class="drag-count" id="songCount">0 / ${noteTotal} 个音</div></section>`);
  const ladder = $("#songLadder");
  const noteElement = $("#songNote");
  const count = $("#songCount");
  let index = 0;
  let position = 100;
  const laneTop = lane => (lanes.findIndex(item => item.id === lane) + .5) / lanes.length * 100;
  const spawn = () => {
    position = 100;
    noteElement.dataset.songLane = phrase[index];
    noteElement.classList.remove("is-live");
    noteElement.style.left = "100%";
    noteElement.style.top = `${laneTop(phrase[index])}%`;
    canvas.querySelectorAll("[data-song-step]").forEach(marker => marker.classList.toggle("current", Number(marker.dataset.songStep) === index));
  };
  const live = () => Math.abs(position - hitLine) <= tolerance;
  const tick = () => {
    position -= step;
    noteElement.style.left = `${Math.max(position, 0)}%`;
    noteElement.classList.toggle("is-live", live());
    if (position >= hitLine - tolerance) return;
    playFoley("miss");
    setMiniProgress(index / noteTotal, `这个音滑过判定线了，等它再次靠近${lanes.find(item => item.id === phrase[index]).label}轨。`);
    spawn();
  };
  miniGameTimer = setInterval(tick, 32);
  const sing = lane => {
    if (index >= noteTotal) return;
    if (!live()) {
      playFoley("miss");
      setMiniProgress(index / noteTotal, position > hitLine ? "唱得早了一点，等音符滑到亮线上。" : "慢了一拍，音符已经过线。");
      return;
    }
    if (lane !== phrase[index]) {
      playFoley("miss");
      setMiniProgress(index / noteTotal, `音高不对，这个音在${lanes.find(item => item.id === phrase[index]).label}轨。`);
      return;
    }
    canvas.querySelector(`[data-song-step="${index}"]`)?.classList.add("sung");
    index += 1;
    registerMiniHit();
    count.textContent = `${index} / ${noteTotal} 个音`;
    playFoley(lane === "high" ? "listen" : lane === "mid" ? "tap" : "flutter");
    showMiniPetPose(petId, index % 2 ? "affection" : "play");
    setMiniProgress(index / noteTotal, index < noteTotal ? `${miniComboNote()}${pet.name}跟上了，准备下一个音。` : `${noteTotal} 个音都跟对了，这段乐句成型了。`);
    if (index >= noteTotal) {
      clearInterval(miniGameTimer);
      noteElement.classList.remove("is-live");
      miniTimeout(finishActiveGame, 620);
      return;
    }
    spawn();
  };
  canvas.querySelectorAll(".song-key").forEach(key => key.addEventListener("click", () => sing(key.dataset.songLane)));
  ladder.addEventListener("keydown", event => {
    const keyed = { 1: "high", 2: "mid", 3: "low", ArrowUp: "high", ArrowRight: "mid", ArrowDown: "low" }[event.key];
    if (!keyed) return;
    event.preventDefault();
    sing(keyed);
  });
  ladder.tabIndex = 0;
  spawn();
  setMiniProgress(0, `乐句已经写在上方，音符滑到亮线时按下对应音高，共 ${noteTotal} 个音。`);
  canvas.querySelector(".song-key")?.focus({ preventScroll: true });
}

function buildTraceGame(petId) {
  const canvas = miniCanvas();
  const pet = petById(petId);
  const rounds = miniRounds(5, 8);
  const points = Array.from({ length: rounds }, (_, index) => {
    const t = (index + 0.45) / rounds;
    return {
      left: 10 + t * 72 + (index % 2 ? 7 : -5),
      top: 26 + Math.sin(index * 1.15) * 16 + index * 3.4
    };
  });
  const line = points.map((point, index) => `${index ? "L" : "M"}${point.left} ${point.top}`).join(" ");
  canvas.insertAdjacentHTML("beforeend", `<section class="trace-stage" aria-label="足迹描摹"><div class="trace-soil" aria-hidden="true"></div><svg class="trace-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${line}"></path></svg><div class="trace-prints">${points.map((point, index) => `<button type="button" class="trace-print${index === 0 ? " ready" : ""}" data-trace-index="${index}" style="left:${point.left}%;top:${point.top}%"><i></i><b>${index + 1}</b></button>`).join("")}</div><strong id="traceCount">0 / ${rounds} 处足迹</strong></section>`);
  let next = 0;
  const press = index => {
    if (index !== next) {
      registerMiniMiss();
      playFoley("miss");
      setMiniProgress(next / rounds, "顺序错了，回到最新的那枚足迹。");
      return;
    }
    const mark = canvas.querySelector(`[data-trace-index="${index}"]`);
    mark.classList.remove("ready");
    mark.classList.add("done");
    next += 1;
    registerMiniHit();
    playFoley("step");
    showMiniPetPose(petId, next % 2 ? "play" : "affection");
    canvas.querySelector(`[data-trace-index="${next}"]`)?.classList.add("ready");
    $("#traceCount").textContent = `${next} / ${rounds} 处足迹`;
    setMiniProgress(next / rounds, next < rounds ? `${miniComboNote()}${pet.name}跟上了这串足迹。` : `${rounds} 处足迹都按顺序接上了。`);
    if (next >= rounds) miniTimeout(finishActiveGame, 520);
  };
  canvas.querySelectorAll(".trace-print").forEach(button => button.addEventListener("click", () => press(Number(button.dataset.traceIndex))));
  setMiniProgress(0, `沿土路按编号点亮足迹，让${pet.name}连续确认路线。`);
  canvas.querySelector(".trace-print.ready")?.focus({ preventScroll: true });
}

function buildPerchGame(petId) {
  const canvas = miniCanvas();
  const pet = petById(petId);
  const rounds = miniRounds(4, 7);
  const order = Array.from({ length: rounds }, (_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swap = (index + miniGameVariant("perch-order", order.length)) % (index + 1);
    [order[index], order[swap]] = [order[swap], order[index]];
  }
  canvas.insertAdjacentHTML("beforeend", `<section class="perch-stage" aria-label="栖木摆位"><div class="perch-sky" aria-hidden="true"></div><div class="perch-row">${order.map((height, index) => `<button type="button" class="perch-step" data-perch-index="${index}" data-perch-height="${height}" style="--perch-height:${18 + height * 10}%"><i></i><u></u><b>${height + 1}</b></button>`).join("")}</div><strong id="perchCount">0 / ${rounds} 根栖木</strong></section>`);
  let next = 0;
  const press = height => {
    if (height !== next) {
      registerMiniMiss();
      playFoley("miss");
      setMiniProgress(next / rounds, "要从最低的栖木往上排，先找更矮的那一根。");
      return;
    }
    const step = canvas.querySelector(`[data-perch-height="${height}"]`);
    step.classList.add("done");
    next += 1;
    registerMiniHit();
    playFoley("success");
    showMiniPetPose(petId, next % 2 ? "affection" : "play");
    $("#perchCount").textContent = `${next} / ${rounds} 根栖木`;
    canvas.querySelectorAll(".perch-step").forEach(button => button.classList.toggle("ready", Number(button.dataset.perchHeight) === next));
    setMiniProgress(next / rounds, next < rounds ? `${miniComboNote()}${pet.name}站上了第 ${next} 根栖木。` : `${rounds} 根栖木都按高度排好了。`);
    if (next >= rounds) miniTimeout(finishActiveGame, 520);
  };
  canvas.querySelectorAll(".perch-step").forEach(button => {
    button.classList.toggle("ready", Number(button.dataset.perchHeight) === 0);
    button.addEventListener("click", () => press(Number(button.dataset.perchHeight)));
  });
  setMiniProgress(0, `从最低的栖木点到最高，帮${pet.name}排好站位。`);
  canvas.querySelector(".perch-step.ready")?.focus({ preventScroll: true });
}

function buildInspectGame(petId, inspectMode = "scan") {
  if (inspectMode === "scent") { buildScentTrailGame(petId); return; }
  if (inspectMode === "listening") { buildListeningGame(petId); return; }
  if (inspectMode === "watch") { buildPerchWatchGame(petId); return; }
  buildScanGame(petId);
}

function buildScentTrailGame(petId) {
  const canvas = miniCanvas();
  const pet = petById(petId);
  const profile = {
    dog: { count: 5, start: 16, span: 68, amplitude: 18, opening: `${pet.name}低下鼻尖，从最清楚的主气味开始追踪。` },
    poodle: { count: 5, start: 17, span: 66, amplitude: 14, opening: `${pet.name}沿干净的路缘慢慢辨认气味。` },
    fox: { count: 6, start: 12, span: 76, amplitude: 23, opening: `${pet.name}贴近地面辨认交叠足迹，路线更长也更曲折。` },
    cat: { count: 5, start: 18, span: 64, amplitude: 13, opening: `${pet.name}停停走走，用鼻尖确认陌生气味的方向。` },
    rabbit: { count: 5, start: 18, span: 62, amplitude: 16, opening: `${pet.name}轻动鼻翼，沿安全草边连续辨味。` },
    hamster: { count: 4, start: 25, span: 50, amplitude: 10, opening: `${pet.name}贴近地面，用鼻尖和胡须确认短距离气味。` }
  }[petId] || { count: 5, start: 16, span: 68, amplitude: 16, opening: `${pet.name}开始辨认前方的连续气味。` };
  const pointCount = miniRounds(profile.count, profile.count + 3);
  const points = Array.from({ length: pointCount }, (_, index) => ({ left: profile.start + index * (profile.span / (pointCount - 1)), top: 42 + Math.sin(index * 1.7 + Math.random()) * profile.amplitude }));
  const path = points.map((point, index) => `${index ? "L" : "M"}${point.left},${point.top}`).join(" ");
  canvas.insertAdjacentHTML("beforeend", `<div class="scent-ribbon"><svg class="scent-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="scent-path-outline" d="${path}"></path><path class="scent-path-core" d="${path}"></path></svg>${points.map((point, index) => `<button type="button" class="scent-wisp ${index === 0 ? "active" : ""}" data-scent="${index}" style="left:${point.left}%;top:${point.top}%" aria-label="第 ${index + 1} 个气味线索"><span>${index + 1}</span></button>`).join("")}</div><div class="scent-field" id="scentField" role="group" tabindex="0" aria-label="按顺序点击高亮气味线索"><img src="assets/props/tracking-nose.webp" alt="嗅闻提示" draggable="false" /></div>`);
  setMiniProgress(0, `${profile.opening} 按顺序点击亮起的气味线索。` );
  const field = $("#scentField");
  let current = 0;
  const advance = () => {
    const node = canvas.querySelector(`[data-scent="${current}"]`);
    if (!node) return;
    node.classList.remove("active"); node.classList.add("found");
    if (window.gsap && !reducedMotion()) gsap.fromTo(node, { scale: 1.35, filter: "brightness(1.8)" }, { scale: 1, filter: "brightness(1)", duration: .42, ease: "power3.out" });
    current += 1;
    registerMiniHit();
    field.setAttribute("aria-valuenow", String(current));
    canvas.querySelector(`[data-scent="${current}"]`)?.classList.add("active");
    setMiniProgress(current / pointCount, current < pointCount ? `${miniComboNote()}气味在前方转弯，保持连续追踪。` : "完整的气味路线已经确认。" );
    playFoley("sniff");
    showMiniPetPose(petId, current % 2 ? "affection" : "play");
    if (current >= pointCount) miniTimeout(finishActiveGame, 650);
  };
  canvas.querySelectorAll("[data-scent]").forEach(node => node.addEventListener("click", () => {
    const index = Number(node.dataset.scent);
    if (index !== current) { playFoley("miss"); setMiniProgress(current / pointCount, "气味顺序错了，先找亮起的线索。" ); return; }
    advance();
  }));
  field.addEventListener("keydown", event => { if (["Enter", " ", "ArrowRight"].includes(event.key)) { event.preventDefault(); advance(); } });
  field.focus({ preventScroll: true });
}

function buildPerchWatchGame(petId) {
  const canvas = miniCanvas();
  const positions = [[18, 36], [72, 28], [48, 58], [30, 66], [82, 52], [58, 22]].slice(0, miniRounds(3, 6));
  canvas.insertAdjacentHTML("beforeend", `<div class="perch-watch-scene">${positions.map(([left, top], index) => `<button type="button" class="perch-signal ${index === 0 ? "active" : ""}" data-perch-signal="${index}" style="left:${left}%;top:${top}%" aria-label="第 ${index + 1} 处环境动静"><span></span></button>`).join("")}</div><div class="perch-watch-field" id="perchWatchField" role="group" tabindex="0" aria-label="按顺序点击闪动的环境标记"><span class="perch-reticle" aria-hidden="true"></span></div>`);
  const field = $("#perchWatchField");
  let current = 0;
  const observe = () => {
    const target = canvas.querySelector(`[data-perch-signal="${current}"]`);
    if (!target) return;
    target.classList.remove("active");
    target.classList.add("found");
    current += 1;
    registerMiniHit();
    canvas.querySelector(`[data-perch-signal="${current}"]`)?.classList.add("active");
    playFoley("listen");
    showMiniPetPose(petId, current % 2 ? "affection" : "play");
    setMiniProgress(current / positions.length, current < positions.length ? `${miniComboNote()}它转向了下一处轻微晃动，继续对准闪光位置。` : `${positions.length} 处环境动静都观察清楚了。` );
    if (current >= positions.length) miniTimeout(finishActiveGame, 650);
  };
  canvas.querySelectorAll("[data-perch-signal]").forEach(signal => signal.addEventListener("click", () => {
    if (Number(signal.dataset.perchSignal) !== current) { playFoley("miss"); setMiniProgress(current / positions.length, "先点击正在闪动的那一处环境标记。" ); return; }
    observe();
  }));
  field.addEventListener("keydown", event => { if (["Enter", " ", "ArrowRight"].includes(event.key)) { event.preventDefault(); observe(); } });
  setMiniProgress(0, `按顺序点击正在闪动的 ${positions.length} 处环境标记；伙伴会跟随你的观察。` );
  field.focus({ preventScroll: true });
}

function buildListeningGame(petId) {
  const canvas = miniCanvas();
  canvas.insertAdjacentHTML("beforeend", `<div class="listening-scene" aria-hidden="true"><i class="rustle-left"></i><i class="rustle-right"></i></div><div class="listening-prompt" id="listeningPrompt" data-direction="left">左侧传来轻响</div><div class="listening-controls"><button data-listen="left"><span aria-hidden="true">←</span> 左侧</button><button data-listen="right">右侧 <span aria-hidden="true">→</span></button></div>`);
  const prompt = $("#listeningPrompt");
  const rounds = miniRounds(3, 6);
  let round = 0;
  let direction = Math.random() > .5 ? "right" : "left";
  const update = () => {
    prompt.dataset.direction = direction;
    prompt.textContent = `${direction === "left" ? "左侧" : "右侧"}传来${round % 2 ? "草叶摩擦" : "细小脚步"}`;
    canvas.querySelectorAll(".listening-scene i").forEach(item => item.classList.remove("active"));
    canvas.querySelector(`.rustle-${direction}`)?.classList.add("active");
  };
  canvas.querySelectorAll("[data-listen]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.listen !== direction) { playFoley("miss"); setMiniProgress(round / rounds, "方向判断错了，先停下来再听一次。" ); return; }
    round += 1;
    registerMiniHit();
    playFoley("listen");
    showMiniPetPose(petId, "affection");
    setMiniProgress(round / rounds, round < rounds ? `${miniComboNote()}听见了，再辨认下一处声音。` : `${rounds} 处声音来源都判断准确。` );
    if (round >= rounds) { canvas.querySelectorAll("[data-listen]").forEach(item => { item.disabled = true; }); miniTimeout(finishActiveGame, 650); return; }
    direction = Math.random() > .5 ? "right" : "left";
    update();
  }));
  update();
  canvas.querySelector("[data-listen]")?.focus({ preventScroll: true });
}

function buildScanGame(petId) {
  const canvas = miniCanvas();
  const rounds = miniRounds(3, 6);
  const layout = [[18, 30], [68, 24], [24, 64], [72, 60], [46, 42], [58, 74]].slice(0, rounds);
  canvas.insertAdjacentHTML("beforeend", `<div class="scan-clues">${layout.map(([left, top], index) => `<button type="button" data-scan-index="${index}" style="left:${left}%;top:${top}%" aria-label="现场线索 ${index + 1}"><span>${index + 1}</span></button>`).join("")}</div><div class="scan-field" id="scanField" role="group" tabindex="0" aria-label="点击线索完成现场扫描"><img src="assets/props/magnifier.webp" alt="观察镜" draggable="false" /></div>`);
  const field = $("#scanField");
  let found = 0;
  const discover = clue => {
    if (!clue || clue.classList.contains("found")) return;
    clue.classList.add("found", "flash");
    miniTimeout(() => clue.isConnected && clue.classList.remove("flash"), 520);
    found += 1;
    registerMiniHit();
    playFoley("listen");
    showMiniPetPose(petId, found % 2 ? "affection" : "play");
    canvas.querySelector(`.scan-clues button[data-scan-index="${found}"]`)?.classList.add("next");
    setMiniProgress(found / rounds, found < rounds ? `${miniComboNote()}记录完成 ${found} 处，移动观察镜寻找下一处实线光圈。` : `${rounds} 处细节都已经记录。` );
    if (found >= rounds) { playFoley("success"); miniTimeout(finishActiveGame, 650); }
  };
  canvas.querySelectorAll(".scan-clues button").forEach(clue => clue.addEventListener("click", () => {
    if (Number(clue.dataset.scanIndex) !== found) { playFoley("miss"); setMiniProgress(found / rounds, "线索顺序不对，先点亮编号最小的线索。" ); return; }
    discover(clue);
  }));
  canvas.querySelector('.scan-clues button[data-scan-index="0"]')?.classList.add("next");
  field.addEventListener("keydown", event => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); discover(canvas.querySelector(`.scan-clues button[data-scan-index=\"${found}\"]`)); } });
  setMiniProgress(0, `按编号点击 ${rounds} 个现场线索，完成一次扫描记录。` );
  field.focus({ preventScroll: true });
}

function buildBubbleGame(petId) {
  const canvas = miniCanvas();
  const isBath = activeGameContext?.type === "home" && activeGameContext.id === "bath";
  if (!isBath) { buildCleanupGame(petId); return; }
  const bubbleParent = isBath ? document.createElement("div") : canvas;
  let sponge = null;
  if (isBath) {
    bubbleParent.className = "pet-bubble-layer";
    canvas.append(bubbleParent);
    canvas.insertAdjacentHTML("beforeend", `<div class="wash-tool" id="washTool" aria-hidden="true"><img src="${INTERACTION_ASSETS.sponge}" alt="" draggable="false" /></div>`);
    sponge = $("#washTool");
  }
  const spots = [[34,24],[47,30],[59,24],[39,45],[55,48],[44,65],[62,67],[30,36],[66,38],[50,58],[36,56],[58,60],[46,42]].slice(0, miniRounds(7, 13, 2)).map(([left, top]) => [left + Math.random() * 7 - 3.5, top + Math.random() * 7 - 3.5]);
  let cleared = 0;
  spots.forEach(([left, top], index) => {
    const bubble = document.createElement("button");
    bubble.className = "bubble";
    bubble.style.left = `${left}%`;
    bubble.style.top = `${top}%`;
    bubble.style.width = `${34 + (index % 3) * 7}px`;
    bubble.style.height = bubble.style.width;
    bubble.setAttribute("aria-label", "擦洗泡泡");
    const pop = () => {
      if (!bubble.isConnected) return;
      bubble.remove();
      cleared += 1;
      registerMiniHit();
      setMiniProgress(cleared / spots.length, cleared < spots.length ? `${miniComboNote()}继续清理遮挡视线的地方。` : "视线已经完全清楚了。" );
      playFoley("pop");
      if (isBath) showMiniPetPose(petId, "affection");
      if (cleared === spots.length) miniTimeout(finishActiveGame, 400);
      else bubbleParent.querySelector(".bubble")?.focus({ preventScroll: true });
    };
    bubble.addEventListener("click", pop, { once: true });
    bubbleParent.append(bubble);
  });
  if (isBath) {
    let scrubbing = false;
    const scrub = event => {
      const rect = canvas.getBoundingClientRect();
      sponge.style.left = `${event.clientX - rect.left}px`;
      sponge.style.top = `${event.clientY - rect.top}px`;
      if (!scrubbing) return;
      const bubble = [...bubbleParent.querySelectorAll(".bubble")].find(item => {
        const bubbleRect = item.getBoundingClientRect();
        return event.clientX >= bubbleRect.left - 18 && event.clientX <= bubbleRect.right + 18 && event.clientY >= bubbleRect.top - 18 && event.clientY <= bubbleRect.bottom + 18;
      });
      bubble?.click();
    };
    canvas.addEventListener("pointerdown", event => { event.preventDefault(); scrubbing = true; canvas.setPointerCapture?.(event.pointerId); scrub(event); });
    canvas.addEventListener("pointermove", scrub);
    canvas.addEventListener("pointerup", () => { scrubbing = false; });
    canvas.addEventListener("pointercancel", () => { scrubbing = false; });
    setMiniProgress(0, "按住海绵在伙伴身上连续擦洗，海绵接触泡泡后才会清除。" );
  }
  bubbleParent.querySelector(".bubble")?.focus({ preventScroll: true });
}

function buildCleanupGame(petId) {
  const canvas = miniCanvas();
  const isLake = state.location === "lakeside";
  const isWoodland = state.location === "forest" || state.location === "highlands";
  const config = isLake
    ? { title: "浅湾打捞", note: "先分辨漂浮物，再沿水流方向捞取。", debris: "wet-debris", tools: [{ id: "net", label: "捞网", asset: "landing-net" }, { id: "hook", label: "长钩", asset: "rake" }, { id: "cloth", label: "吸水布", asset: "cleanup-cloth" }] }
    : isWoodland
      ? { title: "林间巡护", note: "避开幼苗和路标，按落叶堆的纹理清理。", debris: "leaf-pile", tools: [{ id: "rake", label: "耙子", asset: "rake" }, { id: "hook", label: "长钩", asset: "landing-net" }, { id: "cloth", label: "标记布", asset: "cleanup-cloth" }] }
      : { title: "安全整理", note: "先确认行走路线，再处理泥水和碎屑。", debris: "mud-splash", tools: [{ id: "cloth", label: "擦布", asset: "cleanup-cloth" }, { id: "rake", label: "小耙", asset: "rake" }, { id: "hook", label: "夹钳", asset: "landing-net" }] };
  const patches = Array.from({ length: 6 }, (_, index) => ({ left: 12 + Math.random() * 72, top: 28 + Math.random() * 48, rotation: -18 + Math.random() * 36, scale: .72 + Math.random() * .45, index }));
  const spots = [
    { label: isLake ? "芦苇缠住的漂浮物" : isWoodland ? "压住路标的落叶堆" : "入口边的泥水", tool: config.tools[0].id },
    { label: isLake ? "浅水区的湿枝" : isWoodland ? "幼苗旁的碎枝" : "门槛上的碎屑", tool: config.tools[1].id },
    { label: isLake ? "饮水点的细小杂物" : isWoodland ? "巡护线上的松针" : "食盆旁的污渍", tool: config.tools[2].id }
  ];
  const petRoutes = {
    dog: [["right", "down", "left"], ["up", "right", "down"], ["left", "up", "right"]],
    cat: [["up", "right", "right", "down"], ["left", "down", "right"], ["right", "up", "left", "down"]],
    rabbit: [["right", "down"], ["left", "up", "right"], ["down", "right"]],
    hamster: [["down", "right", "up", "left"], ["right", "right", "down"], ["up", "left", "down", "right"]],
    poodle: [["left", "right", "left"], ["right", "left", "right"], ["left", "right", "right"]],
    fox: [["right", "up", "left", "down"], ["down", "left", "up"], ["up", "right", "down", "left"]],
    budgie: [["up", "right", "up"], ["right", "down", "right"], ["left", "up", "right"]],
    cockatiel: [["left", "up", "right"], ["right", "up", "left"], ["up", "left", "down"]]
  };
  const routes = petRoutes[petId] || petRoutes.dog;
  const extraSteps = miniTier().bonus;
  const detours = ["right", "down", "left", "up"];
  spots.forEach((spot, index) => { spot.route = [...routes[index], ...Array.from({ length: extraSteps }, (_, step) => detours[(index + step) % detours.length])]; });
  const arrows = { up: "↑", right: "→", down: "↓", left: "←" };
  miniRounds(spots.length, spots.length);
  canvas.insertAdjacentHTML("beforeend", `<section class="cleanup-stage" aria-label="${config.title}"><div class="cleanup-stage-head"><div><small>现场任务</small><b>${config.title}</b><span>${config.note}</span></div><strong id="cleanupScore">0 / ${spots.length}</strong></div><div class="cleanup-patches" aria-hidden="true">${patches.map(patch => `<img src="assets/props/${config.debris}.webp" alt="" style="left:${patch.left}%;top:${patch.top}%;--patch-rotation:${patch.rotation}deg;--patch-scale:${patch.scale}" draggable="false" />`).join("")}</div><div class="cleanup-field" id="cleanupField" role="group" aria-label="选择现场目标并完成清理路线"><div class="cleanup-spots">${spots.map((spot, index) => `<button type="button" class="cleanup-spot ${index === 0 ? "active" : ""}" data-cleanup-spot="${index}" data-cleanup-required="${spot.tool}" data-cleanup-route="${spot.route.join(",")}"><span>${index + 1}</span><b>${spot.label}</b><small>需要${config.tools.find(tool => tool.id === spot.tool).label}</small></button>`).join("")}</div><div class="cleanup-route"><p id="cleanupHint">先选择正确工具，再按路线处理 1 号现场。</p><div class="cleanup-toolbelt">${config.tools.map(tool => `<button type="button" class="cleanup-tool" data-cleanup-tool="${tool.id}" aria-label="选择${tool.label}"><img src="assets/props/${tool.asset}.webp" alt="" draggable="false" /><b>${tool.label}</b></button>`).join("")}</div><div class="cleanup-pad" role="group" aria-label="清理方向"><button type="button" data-cleanup-step="up">↑</button><span><button type="button" data-cleanup-step="left">←</button><button type="button" data-cleanup-step="down">↓</button><button type="button" data-cleanup-step="right">→</button></span></div></div></div></section>`);
  const field = $("#cleanupField");
  const hint = $("#cleanupHint");
  const score = $("#cleanupScore");
  let activeSpot = 0; let selectedTool = ""; let routeStep = 0; let cleared = 0; let finished = false;
  const updateSpots = () => {
    field.querySelectorAll(".cleanup-spot").forEach((spot, index) => { spot.classList.toggle("active", index === activeSpot); spot.classList.toggle("cleared", index < cleared); });
    score.textContent = `${cleared} / ${spots.length}`;
    setMiniProgress(cleared / spots.length, cleared < spots.length ? hint.textContent : "三个现场都已恢复通行。" );
  };
  const chooseSpot = index => { if (finished || index < cleared) return; activeSpot = index; selectedTool = ""; routeStep = 0; hint.textContent = `选择${spots[index].label}需要的工具。`; updateSpots(); };
  const chooseTool = id => {
    if (finished) return;
    if (id !== spots[activeSpot].tool) { hint.textContent = "工具不合适，先看现场卡片上的提示。"; playFoley("miss"); return; }
    selectedTool = id; routeStep = 0; hint.textContent = `工具准备好了，按路线：${spots[activeSpot].route.map(step => arrows[step]).join(" ")}`;
  };
  const stepRoute = direction => {
    if (finished) return;
    if (!selectedTool) { hint.textContent = "先选择正确工具，再开始移动。"; playFoley("miss"); return; }
    const route = spots[activeSpot].route;
    if (direction !== route[routeStep]) { hint.textContent = "方向偏了，回到现场卡片给出的路线。"; playFoley("miss"); return; }
    routeStep += 1;
    if (routeStep < route.length) { hint.textContent = `继续沿路线移动：还剩 ${route.length - routeStep} 步。`; return; }
    cleared += 1; registerMiniHit(); selectedTool = ""; routeStep = 0; playFoley(isLake ? "splash" : "brush"); showMiniPetPose(petId, cleared % 2 ? "affection" : "play");
    hint.textContent = cleared < spots.length ? `第 ${cleared} 处已处理，选择下一个现场。` : "三个现场都已恢复通行。";
    if (cleared >= spots.length) { finished = true; miniTimeout(finishActiveGame, 560); }
    else activeSpot = cleared;
    updateSpots();
  };
  field.querySelectorAll("[data-cleanup-spot]").forEach(button => button.addEventListener("click", () => chooseSpot(Number(button.dataset.cleanupSpot))));
  field.querySelectorAll("[data-cleanup-tool]").forEach(button => button.addEventListener("click", () => chooseTool(button.dataset.cleanupTool)));
  field.querySelectorAll("[data-cleanup-step]").forEach(button => button.addEventListener("click", () => stepRoute(button.dataset.cleanupStep)));
  field.addEventListener("selectstart", event => event.preventDefault());
  field.addEventListener("dragstart", event => event.preventDefault());
  updateSpots();
  field.querySelector("[data-cleanup-spot]")?.focus({ preventScroll: true });
}

function buildStrokeGame(petId) {
  const canvas = miniCanvas();
  const isPetting = activeGameContext?.type === "home" && activeGameContext.id === "pet";
  const toolAsset = isPetting ? INTERACTION_ASSETS.hand : INTERACTION_ASSETS.brush;
  const actionLabel = isPetting ? "抚摸" : "梳理";
  canvas.insertAdjacentHTML("beforeend", `<div class="stroke-path" id="strokePath" role="button" tabindex="0" aria-label="来回${actionLabel}照料区域，按 Enter 或空格也可操作"></div><div class="stroke-tool ${isPetting ? "hand-tool" : "brush-tool"}" id="strokeTool" aria-hidden="true"><img src="${toolAsset}" alt="" draggable="false" /></div>`);
  const path = $("#strokePath");
  const tool = $("#strokeTool");
  let drawing = false;
  let distance = 0;
  let last = null;
  let responseDistance = 0;
  const segments = miniRounds(4, 8);
  const segmentDistance = Math.max(480, canvas.clientWidth * 1.35) / 4;
  const targetDistance = segmentDistance * segments;
  let segmentsDone = 0;
  let finished = false;
  const trackSegments = () => {
    while (segmentsDone < segments && distance >= segmentDistance * (segmentsDone + 1)) {
      segmentsDone += 1;
      registerMiniHit();
    }
  };
  const completeStroke = () => {
    if (finished) return;
    finished = true;
    drawing = false;
    playFoley(isPetting ? "tap" : "brush");
    startPetFrameLoop($("#miniPet"), petId, "affection", 680);
    if (window.gsap && !reducedMotion()) gsap.to($("#miniPet"), { y: 5, rotation: isPetting ? 1.5 : -1.5, scale: 1.025, duration: .75, yoyo: true, repeat: 1, ease: "sine.inOut" });
    miniTimeout(finishActiveGame, 1550);
  };
  const move = event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    tool.style.left = `${x}px`;
    tool.style.top = `${y}px`;
    if (!drawing) return;
    if (last) {
      const segment = Math.hypot(x - last.x, y - last.y);
      distance += segment;
      responseDistance += segment;
      const angle = Math.atan2(y - last.y, x - last.x) * 180 / Math.PI;
      tool.style.setProperty("--tool-angle", `${clamp(angle, -32, 32)}deg`);
    }
    last = { x, y };
    if (responseDistance >= 85) {
      responseDistance = 0;
      const pet = $("#miniPet");
      pet.src = petFramePath(petId, "affection", pet.src.endsWith("-0.webp") ? 1 : 0);
      if (window.gsap && !reducedMotion()) gsap.to(pet, { rotation: x < rect.width / 2 ? -1.2 : 1.2, y: 3, duration: .6, ease: "sine.out", overwrite: "auto" });
    }
    trackSegments();
    setMiniProgress(distance / targetDistance, isPetting ? `${miniComboNote()}保持轻柔而连续的手势。` : `${miniComboNote()}顺着毛发生长方向慢慢梳理。` );
    if (distance >= targetDistance) completeStroke();
  };
  path.addEventListener("pointerdown", event => { drawing = true; last = null; path.setPointerCapture?.(event.pointerId); move(event); });
  path.addEventListener("pointermove", move);
  const release = () => {
    drawing = false;
    last = null;
    const pet = $("#miniPet");
    if (pet && window.gsap && !finished) gsap.to(pet, { rotation: 0, y: 0, duration: .7, ease: "power2.out" });
  };
  path.addEventListener("pointerup", release);
  path.addEventListener("pointercancel", release);
  path.addEventListener("keydown", event => {
    if (!["Enter", " "].includes(event.key) || finished) return;
    event.preventDefault();
    distance += segmentDistance;
    trackSegments();
    setMiniProgress(distance / targetDistance, `${miniComboNote()}继续梳理，动作已经更顺了。` );
    if (distance >= targetDistance) completeStroke();
  });
  path.focus({ preventScroll: true });
}

function makeDraggable(element, target, onSuccess, onMove = null) {
  let dragging = false;
  let offset = { x: 0, y: 0 };
  let origin = { x: 0, y: 0 };
  let lastPoint = null;
  const parent = element.parentElement;
  const currentTarget = () => typeof target === "function" ? target() : target;
  const move = event => {
    if (!dragging) return;
    const point = validPointer(event, lastPoint);
    if (!point) return;
    lastPoint = point;
    const rect = parent.getBoundingClientRect();
    element.style.transform = `translate3d(${point.x - rect.left - offset.x}px, ${point.y - rect.top - offset.y}px, 0)`;
    element.style.left = "0";
    element.style.top = "0";
    onMove?.(point);
  };
  const finish = event => {
    if (!dragging) return;
    dragging = false;
    const point = validPointer(event, lastPoint) || lastPoint;
    element.releasePointerCapture?.(event.pointerId);
    const dropTarget = currentTarget();
    if (point && overlapsAtPoint(element, dropTarget, point, 24)) { dropTarget?.classList.remove("ready"); onSuccess(); return; }
    dropTarget?.classList.remove("ready");
    const restore = () => { element.style.left = `${origin.x}px`; element.style.top = `${origin.y}px`; resetDragTransform(element); };
    if (window.gsap) gsap.to(element, { x: origin.x, y: origin.y, duration: .25, ease: "power3.out", onComplete: restore });
    else restore();
  };
  element.addEventListener("pointerdown", event => {
    event.preventDefault();
    dragging = true;
    lastPoint = { x: event.clientX, y: event.clientY };
    const rect = element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    origin = { x: rect.left - parentRect.left, y: rect.top - parentRect.top };
    offset = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    element.setPointerCapture?.(event.pointerId);
  });
  element.addEventListener("pointermove", move);
  element.addEventListener("pointerup", finish);
  element.addEventListener("pointercancel", finish);
  element.addEventListener("keydown", event => {
    if (!["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    onSuccess();
  });
}

function validPointer(event, fallback) {
  if (Number.isFinite(event?.clientX) && Number.isFinite(event?.clientY) && (event.clientX !== 0 || event.clientY !== 0)) return { x: event.clientX, y: event.clientY };
  return fallback || null;
}

function rectsOverlap(first, second, padding = 0) {
  return first.right + padding >= second.left && first.left - padding <= second.right && first.bottom + padding >= second.top && first.top - padding <= second.bottom;
}

function overlapsAtPoint(element, target, point, padding = 0) {
  if (!element || !target || !point) return false;
  const targetRect = target.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  if (rectsOverlap(elementRect, targetRect, padding)) return true;
  return point.x >= targetRect.left - padding && point.x <= targetRect.right + padding && point.y >= targetRect.top - padding && point.y <= targetRect.bottom + padding;
}

function resetDragTransform(element) { element.style.transform = ""; }

function finishActiveGame() {
  if (!state.miniGameActive || !activeGameContext) return;
  const context = activeGameContext;
  const petId = context.petId;
  if (!state.ownedPetIds.includes(petId)) { cancelMiniGame(); return; }
  const completionReward = context.type === "event" ? context.event.reward : context.reward;
  if (context.type === "event") completeEvent(context.event, petId);
  else if (context.type === "activity") {
    applyReward(context.reward, petId);
    applyOutdoorWeatherExposure(context.location, petId);
    recordCompleted(activityKey(context.activity, petId));
    state.daily.activities += 1;
    markRoutine("outing", petId);
    toast(`完成地点活动“${context.activity.label}”`);
  }
  else if (context.type === "freeplay") {
    applyReward(context.reward, petId);
    applyOutdoorWeatherExposure(context.location, petId);
    markRoutine("outing", petId);
    toast(`完成探索小游戏“${context.game.label}”`);
  }
  else {
    applyReward(context.reward, petId);
    const pet = petById(petId);
    const stats = statsFor(petId);
    if (["pet", "brush"].includes(context.id)) { stats.stress = clamp(stats.stress - 8, 0, 100); stats.comfort = clamp(stats.comfort + 6, 0, 100); }
    if (context.id === "bath") { stats.stress = clamp(stats.stress - 3, 0, 100); stats.comfort = clamp(stats.comfort + 4, 0, 100); }
    if (context.id === pet.favoriteAction) {
      applyReward({ mood: 4, trust: 2, growth: 4 }, petId);
      toast(`${pet.name}格外喜欢这项活动。`);
    }
    if (isPetActiveNow(pet)) applyReward({ energy: 2, growth: 2 }, petId);
    if (["feed", "treat"].includes(context.id)) markRoutine("breakfast", petId);
    if (["play", "pet"].includes(context.id)) markRoutine("bond", petId);
    if (["brush", "bath"].includes(context.id)) markRoutine("clean", petId);
  }
  state.pendingMinigameCost = null;
  const quality = miniGameRating();
  recordMiniMastery(quality);
  const stats = statsFor(petId);
  Object.entries(quality.reward).forEach(([key, value]) => {
    if (key === "growth") stats.growth = Math.max(0, stats.growth + value);
    else stats[key] = clamp(stats[key] + value, 0, 100);
  });
  closeMiniGame();
  showCompletionFlourish(combineRewards(completionReward, quality.reward), quality.label, `${quality.difficulty.label} · 评级 ${quality.id}${quality.combo >= 2 ? ` · 连击 ×${quality.combo}` : ""}`);
  showPet(state.activePetId, "affection");
  setTimeout(() => { if (!state.miniGameActive && state.view === "location") showPet(state.activePetId, "idle"); }, 1500);
  playPetVoice(petId, "happy");
  speak(context.type === "event" ? `事情处理好了，${petById(petId).name}感受到这次${quality.label}配合。` : `${petById(petId).name}明显放松了下来，这次互动是${quality.label}的。`);
  renderAll();
  if (state.view === "location") { renderLocationPanel(); els.locationPanel.focus({ preventScroll: true }); }
}

function completeEvent(event, petId = eventPet(event)) {
  recordCompleted(eventKey(event, petId));
  state.selectedEventId = null;
  applyReward(event.reward, petId);
  applyOutdoorWeatherExposure(event.location, petId);
  const involvedPetId = petId;
  if (state.ownedPetIds.includes(involvedPetId) && petById(involvedPetId).favoriteLocation === event.location) {
    const stats = statsFor(involvedPetId);
    stats.trust = clamp(stats.trust + 2, 0, 100);
    stats.growth += 4;
    toast(`${petById(involvedPetId).name}很喜欢在这里活动。`);
  }
  state.daily.events += 1;
  state.records.events += 1;
  if (event.id.startsWith("chance-") || event.id.startsWith("weather-")) {
    state.daily.randomEvents += 1;
    state.records.randomEvents += 1;
  }
  markRoutine("outing", petId);
  toast(`完成“${event.title}”`);
}

function applyReward(reward = {}, petId = state.activePetId) {
  const stats = statsFor(petId);
  const previousLevel = sanctuaryLevel();
  Object.entries(reward).forEach(([key, value]) => {
    if (key === "coins") { state.coins += value; state.daily.coins += value; state.records.earnedCoins += Math.max(0, value); }
    else if (key === "reputation") { state.reputation += value; state.renown += Math.max(0, value); state.daily.reputation += value; }
    else if (INVENTORY_ITEMS[key]) addInventory(key, value);
    else if (["hunger", "clean", "mood", "energy", "health", "comfort", "stress"].includes(key)) stats[key] = clamp(stats[key] + value, 0, 100);
    else if (key === "trust") stats.trust = clamp(stats.trust + value, 0, 100);
    else if (key === "growth") stats.growth = Math.max(0, stats.growth + value);
    else if (key === "candidate" && !hasPetOrCandidate(value)) state.candidates.push(value);
  });
  stats.interactions += 1;
  stats.growth += 3;
  state.daily.care += 1;
  state.records.care += 1;
  if (!state.daily.pets.includes(petId)) state.daily.pets.push(petId);
  notifyLevelUnlock(previousLevel);
  saveState();
}

function applyOutdoorWeatherExposure(locationId, petId = state.activePetId) {
  if (!OUTDOOR_LOCATIONS.has(locationId)) return;
  const stats = statsFor(petId);
  const pet = petById(petId);
  const exposure = {
    drizzle: { clean: -2, energy: -1, comfort: -1, stress: 0 },
    rain: { clean: -5, energy: -3, comfort: -4, stress: 2 },
    fog: { clean: -1, energy: -2, comfort: -1, stress: 2 },
    wind: { clean: -2, energy: -4, comfort: -3, stress: pet?.bird ? 6 : 2 },
    coldSnap: { clean: 0, energy: -5, comfort: pet?.bird ? -8 : -5, stress: pet?.bird ? 5 : 2 }
  }[state.weather];
  if (!exposure) return;
  Object.entries(exposure).forEach(([key, value]) => { stats[key] = clamp(stats[key] + value, 0, 100); });
  if (state.weather === "rain") toast(`${pet.name}淋到中雨，回家后需要擦干并休息。`);
}

function notifyLevelUnlock(previousLevel) {
  const newLevel = sanctuaryLevel();
  if (newLevel <= previousLevel) return;
  const unlocked = Object.values(LOCATIONS).filter(location => location.level === newLevel).map(location => location.name).join("、");
  toast(`家园升到 Lv.${newLevel}，解锁${unlocked}。`);
  playFoley("success");
}

function grantManagementReward(reward = {}) {
  const previousLevel = sanctuaryLevel();
  Object.entries(reward).forEach(([key, value]) => {
    if (key === "coins") { state.coins += value; state.daily.coins += value; state.records.earnedCoins += Math.max(0, value); }
    else if (key === "reputation") { state.reputation += value; state.renown += Math.max(0, value); state.daily.reputation += value; }
    else if (INVENTORY_ITEMS[key]) addInventory(key, value);
  });
  notifyLevelUnlock(previousLevel);
  saveState();
}

function addInventory(id, amount) {
  const added = Math.min(amount, backpackSpace());
  state.inventory[id] = (state.inventory[id] || 0) + added;
  if (added < amount) toast(`背包已满，${amount - added} 份${INVENTORY_ITEMS[id].label}没有装下。`);
  return added;
}

function cancelMiniGame() {
  if (!state.miniGameActive) return;
  if (activeGameContext?.type === "event") refundCost(activeGameContext.event.cost);
  else if (activeGameContext?.type === "home") refundCost(HOME_ACTIONS[activeGameContext.id].cost);
  else if (activeGameContext?.type === "activity") refundCost(activeGameContext.activity.cost);
  else if (activeGameContext?.type === "freeplay") refundCost(activeGameContext.game.cost);
  state.pendingMinigameCost = null;
  closeMiniGame();
  showPet(state.activePetId, "idle");
  renderLocationPanel();
  els.locationPanel.focus({ preventScroll: true });
}

function refundCost(cost) { if (cost) Object.entries(cost).forEach(([key, amount]) => state.inventory[key] = (state.inventory[key] || 0) + amount); }
function closeMiniGame() {
  clearTimeout(miniGameTimer);
  clearInterval(miniGameTimer);
  miniGameTimer = null;
  clearMiniTimers();
  state.miniGameActive = false;
  activeGameContext = null;
  miniGameSession = null;
  const miniPet = $("#miniPet");
  if (miniPet) { stopPetFrames(miniPet); window.gsap?.killTweensOf?.(miniPet); }
  els.location.classList.remove("playing");
  document.body.classList.remove("mini-open");
  els.miniGame.hidden = true;
  els.miniGame.innerHTML = "";
  delete els.miniGame.dataset.game;
  delete els.miniGame.dataset.inspectMode;
  els.miniGame.removeAttribute("role");
  els.miniGame.removeAttribute("aria-modal");
  els.miniGame.removeAttribute("aria-labelledby");
  saveState();
}

function adoptPet(id) {
  const pet = petById(id);
  if (!pet || !state.candidates.includes(id)) return;
  if (state.ownedPetIds.length >= state.capacity) { toast("住所没有空位，先去集市扩建。"); return; }
  if (state.reputation < pet.adoptRep) { toast("山谷口碑还不足以办理领养。"); return; }
  state.reputation -= pet.adoptRep;
  state.candidates = state.candidates.filter(candidate => candidate !== id);
  state.ownedPetIds.push(id);
  const rescuedStats = statsFor(id);
  state.petStats[id] = { ...defaultStats(), ...rescuedStats, trust: Math.max(12, rescuedStats.trust), growth: Math.max(6, rescuedStats.growth) };
  state.petRoutines[id] = defaultRoutine(state.day);
  state.activePetId = id;
  state.records.adoptions += 1;
  saveState();
  renderAll(); renderLocationPanel(); showPet(id, "affection"); playPetVoice(id, "happy");
  toast(`${pet.name}正式住进了动物家园。`);
}

function buyStock(id) {
  const item = MARKET_STOCK.find(stock => stock.id === id);
  if (!item || stockPurchaseBlocked(item)) { toast("金币不足或背包没有足够空间。" ); return; }
  state.coins -= item.price;
  addInventory(item.id, item.amount);
  saveState(); renderAll(); renderLocationPanel(); playFoley("coin"); toast(`${item.name}已经放进仓库。`);
}

function buyFurniture(id) {
  const item = FURNITURE_CATALOG.find(entry => entry.id === id);
  if (!item || state.furnitureOwned.includes(id)) return;
  if (state.coins < item.price) { toast("金币不足，先完成山谷事务。" ); return; }
  state.coins -= item.price;
  state.furnitureOwned.push(id);
  const offset = state.furnitureOwned.length * 7;
  const y = 78 - state.furnitureOwned.length % 2 * 10;
  state.furniturePlaced[id] = { x: clamp(28 + offset, 18, 82), y, scale: 1, rotation: 0, layer: y };
  state.selectedFurnitureId = id;
  state.pendingFurnishId = id;
  saveState(); renderAll(); renderLocationPanel(); playFoley("coin"); toast(`${item.name}已经送到家园。点“回家布置”就能直接摆放。`);
}

function buyPet(id) {
  const pet = petById(id);
  if (!pet || !pet.price || state.coins < pet.price || state.ownedPetIds.includes(id)) return;
  if (state.ownedPetIds.length >= state.capacity) { toast("住所没有空位，先完成扩建。"); return; }
  state.coins -= pet.price;
  state.ownedPetIds.push(id);
  state.petStats[id] = defaultStats();
  state.petRoutines[id] = defaultRoutine(state.day);
  state.activePetId = id;
  state.records.purchases += 1;
  saveState(); renderAll(); renderLocationPanel(); showPet(id, "affection"); playPetVoice(id, "happy"); toast(`${pet.name}完成登记，今天就会入住。`);
}

function capacityCost() { return 90 + (state.capacity - 2) * 65; }
function backpackUpgradeCost() { return 45 + Math.max(0, (state.backpackCapacity - 24) / 6) * 28; }
function upgradeHome() {
  const cost = capacityCost();
  if (state.capacity >= 6 || state.coins < cost) return;
  state.coins -= cost; state.capacity += 1; saveState(); renderAll(); renderLocationPanel(); playFoley("success"); toast("住所扩建完成，增加了一个动物位置。" );
}

function upgradeBackpack() {
  const cost = backpackUpgradeCost();
  if (state.backpackCapacity >= 48 || state.coins < cost) return;
  state.coins -= cost;
  state.backpackCapacity += 6;
  saveState(); renderAll(); renderLocationPanel(); playFoley("success"); toast("背包增加了 6 个物资格位。" );
}

function playTimeAdvanceTransition(amount = 30) {
  if (timeAdvanceTimeline || state.miniGameActive || els.dayDialog.open) return;
  const fromMinutes = state.minutes;
  const actualAmount = Math.min(amount, Math.max(0, 1320 - fromMinutes));
  if (!actualAmount || !window.gsap || reducedMotion()) { playFoley("clockChime"); advanceTime(amount); return; }
  const toMinutes = fromMinutes + actualAmount;
  const fromAngles = clockHandAngles(fromMinutes);
  const toAngles = { hour: fromAngles.hour + actualAmount * .5, minute: fromAngles.minute + actualAmount * 6 };
  const liveClock = { minutes: fromMinutes };
  els.timeTransitionFrom.textContent = formatTime(fromMinutes);
  els.timeTransitionTo.textContent = formatTime(toMinutes);
  els.timeTransitionLive.textContent = formatTime(fromMinutes);
  els.timeTransition.setAttribute("aria-label", `山谷时间从 ${formatTime(fromMinutes)} 推进到 ${formatTime(toMinutes)}`);
  els.timeTransition.hidden = false;
  els.advance.disabled = true;
  playTimeAdvanceSound();
  gsap.set([els.timeHourHand, els.advanceHour], { rotation: fromAngles.hour });
  gsap.set([els.timeMinuteHand, els.advanceMinute], { rotation: fromAngles.minute });
  const finish = () => {
    advanceTime(actualAmount);
    clearTimeAdvanceSound();
    els.timeTransition.hidden = true;
    els.advance.disabled = false;
    gsap.set(els.timeTransition, { clearProps: "opacity,visibility,clipPath" });
    gsap.set([els.timeHourHand, els.timeMinuteHand], { clearProps: "transform" });
    timeAdvanceTimeline = null;
    syncAdvanceClock(state.minutes);
    els.advance.focus({ preventScroll: true });
  };
  timeAdvanceTimeline = gsap.timeline({ onComplete: finish, defaults: { ease: "power3.out" } })
    .fromTo(els.timeTransition, { clipPath: "circle(0% at 50% 50%)", autoAlpha: 0 }, { clipPath: "circle(75% at 50% 50%)", autoAlpha: 1, duration: .34 }, 0)
    .fromTo(els.timeTransition.querySelector(".time-transition-clock"), { y: 24, scale: .7, rotation: -8, autoAlpha: 0 }, { y: 0, scale: 1, rotation: 0, autoAlpha: 1, duration: .44 }, .06)
    .fromTo(els.timeTransition.querySelector(".time-transition-copy"), { x: 34, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .4 }, .12)
    .fromTo(els.timeTransition.querySelector(".time-transition-copy span u"), { scaleX: 0 }, { scaleX: 1, duration: .38 }, .24)
    .to([els.timeHourHand, els.advanceHour], { rotation: toAngles.hour, duration: .92, ease: "power2.inOut" }, .28)
    .to([els.timeMinuteHand, els.advanceMinute], { rotation: toAngles.minute, duration: .92, ease: "power2.inOut" }, .28)
    .to(liveClock, { minutes: toMinutes, duration: .92, ease: "power2.inOut", onUpdate: () => { els.timeTransitionLive.textContent = formatTime(Math.round(liveClock.minutes)); } }, .28)
    .fromTo(els.timeTransitionLive, { scale: .82, textShadow: "0 0 20px rgba(244,212,126,.7)" }, { scale: 1, textShadow: "0 0 0 transparent", duration: .92 }, .28)
    .to(els.timeTransition, { autoAlpha: 0, duration: .26, ease: "power2.in" }, 1.28);
}

function clearTimeAdvanceSound() {
  timeAdvanceSoundTimers.forEach(timer => clearTimeout(timer));
  timeAdvanceSoundTimers = [];
}

function playTimeAdvanceSound() {
  clearTimeAdvanceSound();
  if (!ensureAudioContext()) return;
  [250, 365, 480, 595, 710, 825, 940, 1055].forEach(delay => {
    timeAdvanceSoundTimers.push(setTimeout(() => playFoley("clockTick"), delay));
  });
  timeAdvanceSoundTimers.push(setTimeout(() => playFoley("clockChime"), 1200));
}

function advanceTime(amount = 30) {
  if (state.miniGameActive || els.dayDialog.open) return;
  const before = activeEvents().map(event => event.id);
  state.minutes += amount;
  decayStats(amount);
  if (state.minutes >= 1320) { state.minutes = 1320; renderAll(); showDayDialog(); return; }
  const after = activeEvents();
  const appeared = after.find(event => !before.includes(event.id));
  if (appeared) { toast(`${LOCATIONS[appeared.location].name}出现新事件：${appeared.title}`); playFoley("event"); }
  renderAll();
  if (state.view === "location") renderLocationPanel();
  saveState();
}

function decayStats(minutes) {
  const factor = minutes / 30;
  const weatherDrain = {
    clear: { clean: 0, mood: -.18, energy: 0, sleep: 0, comfort: -.12, stress: -.32 },
    partlyCloudy: { clean: 0, mood: -.14, energy: -.04, sleep: 0, comfort: -.08, stress: -.2 },
    cloudy: { clean: 0, mood: -.08, energy: -.08, sleep: 0, comfort: 0, stress: -.1 },
    drizzle: { clean: .12, mood: .08, energy: .08, sleep: .35, comfort: .12, stress: .04 },
    rain: { clean: .3, mood: .24, energy: .18, sleep: .7, comfort: .3, stress: .18 },
    heavyRain: { clean: .1, mood: .34, energy: .08, sleep: .9, comfort: .42, stress: .5 },
    thunderstorm: { clean: .05, mood: .55, energy: .12, sleep: .55, comfort: .65, stress: .9 },
    fog: { clean: .05, mood: .08, energy: .18, sleep: .2, comfort: .08, stress: .12 },
    wind: { clean: .12, mood: .1, energy: .32, sleep: 0, comfort: .22, stress: .2 },
    coldSnap: { clean: 0, mood: .18, energy: .38, sleep: .5, comfort: .48, stress: .26 }
  }[state.weather] || { clean: 0, mood: 0, energy: 0, sleep: 0, comfort: 0, stress: 0 };
  state.ownedPetIds.forEach(id => {
    const stats = statsFor(id);
    stats.hunger = clamp(Math.round(stats.hunger - (stats.asleep ? 1.8 : 1.2) * factor), 0, 100);
    stats.clean = clamp(Math.round(stats.clean - (.45 + weatherDrain.clean) * factor), 0, 100);
    stats.comfort = clamp(Math.round(stats.comfort - (.32 + weatherDrain.comfort) * factor), 0, 100);
    const sensitivity = petById(id)?.bird && ["thunderstorm", "wind", "coldSnap"].includes(state.weather) ? 1.8 : 1;
    stats.stress = clamp(Math.round(stats.stress + weatherDrain.stress * sensitivity * factor - (stats.asleep ? .35 : .08) * factor), 0, 100);
    if (stats.asleep) {
      const beddingBonus = state.inventory.bedding > 0 ? 2 : 0;
      stats.energy = clamp(Math.round(stats.energy + (7 + beddingBonus + weatherDrain.sleep) * factor), 0, 100);
      stats.health = clamp(Math.round(stats.health + 1.2 * factor), 0, 100);
      stats.sleepMinutes += minutes;
      state.records.sleepMinutes += minutes;
      if (stats.sleepMinutes >= 120) markRoutine("sleep", id);
      if (stats.energy >= 98 && stats.sleepMinutes >= 120) {
        stats.asleep = false;
        if (id === state.activePetId) {
          stopSnoreLoop();
          toast(`${petById(id).name}睡足后自然醒来了。`);
          speak("它伸了个懒腰，精神已经完全恢复。" );
        }
      }
    } else {
      stats.energy = clamp(Math.round(stats.energy - (1.4 + weatherDrain.energy) * factor), 0, 100);
      stats.mood = clamp(Math.round(stats.mood - Math.max(.25, .6 + weatherDrain.mood) * factor), 0, 100);
    }
    if (stats.hunger < 25 || stats.clean < 20 || stats.energy < 15 || stats.comfort < 20 || stats.stress > 82) stats.health = clamp(stats.health - Math.ceil(factor), 0, 100);
  });
}

function dayStoryLine(completedRoutines, routineTargetMet, projectedStreak) {
  const pet = petById(state.activePetId);
  if (state.daily.events + state.daily.activities === 0) {
    return `${pet.name}在家园等了一整天。明天先从早餐或救助站门口的纸箱开始。`;
  }
  if (routineTargetMet) {
    return `${pet.name}把今天过完整了。连胜 ${projectedStreak} 天，山谷也记住了这轮照管。`;
  }
  return `今天走了 ${state.daily.locations.length || 1} 个地点，${completedRoutines} 位伙伴完成了全部日程。睡前再补一项，连胜就能保住。`;
}

function dayPostcardText(completedRoutines, routineTargetMet, projectedStreak) {
  const pet = petById(state.activePetId);
  return [
    `山谷动物家园 · 第 ${state.day} 天`,
    dayStoryLine(completedRoutines, routineTargetMet, projectedStreak),
    `${pet.name}：事件 ${state.daily.events}，活动 ${state.daily.activities}，金币 +${state.daily.coins}，口碑 +${state.daily.reputation}。`,
    routineTargetMet ? `照管连胜 ${projectedStreak} 天。` : "连胜中断，明天从早餐重新开始。"
  ].join("\n");
}

function shareDayPostcard() {
  const completedRoutines = state.ownedPetIds.filter(id => routineDoneCount(id) === routineSteps().length).length;
  const routineTargetMet = bestRoutineDoneCount() >= 4;
  const projectedStreak = routineTargetMet ? state.careStreak + 1 : 0;
  const text = dayPostcardText(completedRoutines, routineTargetMet, projectedStreak);
  const copied = () => toast("今日明信片已抄好，可以贴到别处。");
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(copied).catch(() => toast(text));
    return;
  }
  toast(text);
}

function showDayDialog() {
  state.ownedPetIds.forEach(id => {
    if (statsFor(id).asleep && statsFor(id).sleepMinutes >= 120) markRoutine("sleep", id);
  });
  const completedRoutines = state.ownedPetIds.filter(id => routineDoneCount(id) === routineSteps().length).length;
  const routineTargetMet = bestRoutineDoneCount() >= 4;
  const projectedStreak = routineTargetMet ? state.careStreak + 1 : 0;
  const milestone = careStreakMilestone(projectedStreak);
  els.dayResults.innerHTML = `<div class="day-result"><b>${state.daily.events}</b><small>完成事件</small></div><div class="day-result"><b>${state.daily.activities}</b><small>地点活动</small></div><div class="day-result"><b>${completedRoutines}/${state.ownedPetIds.length}</b><small>伙伴完整日程</small></div><div class="day-result"><b>${state.daily.coins}</b><small>获得金币</small></div><div class="day-result"><b>${state.daily.reputation}</b><small>获得口碑</small></div><div class="day-result ${routineTargetMet ? "streak-ready" : ""}"><b>${projectedStreak} 天</b><small>${routineTargetMet ? "照管连胜" : "连胜中断"}</small></div><p class="day-streak-note">${milestone ? `${milestone.label}：迎接新一天可领取 ${rewardSummary(milestone.reward)}。` : routineTargetMet ? "已达到今日连胜条件，继续保持生活节奏。" : "完成至少 4 项生活日程即可延续连胜。"}</p><p class="day-story">${dayStoryLine(completedRoutines, routineTargetMet, projectedStreak)}</p>`;
  els.dayDialog.showModal();
  animateDialogOpen(els.dayDialog);
}

function animateDialogOpen(dialog) {
  if (!window.gsap || reducedMotion()) return;
  const sheet = dialog.querySelector(".dialog-sheet");
  if (!sheet) return;
  const contents = [...sheet.children].filter(element => !element.classList.contains("dialog-close")).slice(0, 10);
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .fromTo(sheet, { y: 38, scale: .9, rotationX: -5, autoAlpha: .12 }, { y: 0, scale: 1, rotationX: 0, autoAlpha: 1, duration: .48, clearProps: "transform,opacity,visibility" }, 0)
    .fromTo(contents, { y: 18, autoAlpha: .08 }, { y: 0, autoAlpha: 1, duration: .38, stagger: { each: .04, amount: .28 }, clearProps: "transform,opacity,visibility" }, .14)
    .fromTo(sheet.querySelector(".dialog-close"), { rotation: -60, scale: .6, autoAlpha: 0 }, { rotation: 0, scale: 1, autoAlpha: 1, duration: .38, clearProps: "transform,opacity,visibility" }, .2);
}

const ONBOARDING_STEPS = [
  { zone: "时间推进", scene: "world", target: () => els.advance, title: "这个黄色按钮会推进 30 分钟", text: "按钮上的模拟时钟与当前游戏时间完全同步。点击后，时针和分针会真实转动：30 分钟对应分针半圈、时针前进 15 度。", demo: "手指正在演示黄色的 +30 分钟按钮" },
  { zone: "经营日历", scene: "calendar", target: () => els.calendarGrid.querySelector(".calendar-day.today") || els.calendar, title: "提前查看固定经营安排", text: "日历会真实展开，并标出集市补货、救助接收、节庆和往日经营记录。未来天气会保密，直到新一天揭晓。", demo: "已打开真实日历，手指指向今天" },
  { zone: "山谷地图", scene: "world", target: () => els.mapLocations.querySelector(".map-hotspot:not(:disabled)"), title: "地图地标就是功能入口", text: "地点按钮覆盖在真实地标上。红色数字表示当前事件，底部事件条会告诉你事件发生在哪里、持续到什么时候。", demo: "手指正在演示可进入的地点" },
  { zone: "地点任务区", scene: "home", target: tutorialHomeActionTarget, title: "进入地点后在这里安排互动", text: "右侧任务区会随地点和动物变化。喂食、清洁、抚摸、追踪气味等玩法各不相同，开始前会写明互动方式。", demo: "手指指向右侧面板中当前可用的照料入口" },
  { zone: "物资背包", scene: "inventory", target: () => els.inventoryGrid.querySelector('[data-inventory-item="food"]') || els.inventoryGrid, title: "背包物资会参与照料与任务", text: "食物、药品、玩具和清洁用品都有真实库存与容量。选择物资后可以直接给当前伙伴使用，也可能被小游戏消耗。", demo: "已打开真实背包，手指指向食物格" },
  { zone: "伙伴功能区", scene: "home", target: () => els.roster.querySelector(".pet-chip.active .pet-portrait") || els.dock, title: "底部伙伴栏负责切换动物", text: "点击头像切换当前伙伴。每只动物的状态、成长、任务完成情况和五项生活日程都独立记录，不会互相继承。", demo: "手指正在演示当前伙伴头像" },
  { zone: "自动存档", scene: "home", target: () => els.saveStatus || els.help, title: "看到绿点就表示进度已保存", text: "完成任务、购买物资、推进时间、切换伙伴或离开页面都会自动存档。绿色状态点会显示最近保存时间。", demo: "绿色状态点会显示最近保存时间" }
];
let onboardingStep = 0;
let tutorialHandTimeline = null;
let tutorialTarget = null;
let tutorialTrackingFrame = null;

function tutorialHomeActionTarget() {
  return [...els.locationPanel.querySelectorAll("[data-home-action]:not(:disabled)")]
    .find(target => tutorialTargetRect(target));
}

function closeTutorialPreviewDialogs() {
  [els.calendarDialog, els.inventoryDialog].forEach(dialog => {
    dialog.classList.remove("tutorial-preview");
    if (dialog.open) dialog.close();
  });
}

function openTutorialPreview(dialog, render) {
  render();
  dialog.setAttribute("open", "");
  dialog.classList.add("tutorial-preview");
  animateDialogOpen(dialog);
}

function prepareTutorialScene(scene) {
  closeTutorialPreviewDialogs();
  if (scene === "world") showWorld();
  else if (scene === "calendar") {
    showWorld();
    calendarViewMonth = calendarMonthForDay(state.day);
    calendarSelectedDay = state.day;
    renderCalendar();
    els.calendarDialog.setAttribute("open", "");
    els.calendarDialog.classList.add("tutorial-preview");
    animateCalendarOpen();
  } else if (scene === "home") enterLocation("home");
  else if (scene === "inventory") {
    if (state.view !== "location" || state.location !== "home") enterLocation("home");
    openTutorialPreview(els.inventoryDialog, renderInventory);
  }
}

function tutorialTargetRect(target) {
  if (!target?.isConnected || target.matches?.(":disabled") || target.closest?.("[hidden]")) return null;
  const style = getComputedStyle(target);
  if (style.display === "none" || style.visibility === "hidden" || style.pointerEvents === "none") return null;
  const rect = target.getBoundingClientRect();
  if (rect.width < 8 || rect.height < 8) return null;
  return rect;
}

function tutorialTargetIsInViewport(rect) {
  return rect.right > 0 && rect.bottom > 0 && rect.left < innerWidth && rect.top < innerHeight;
}

function setTutorialCueVisible(visible) {
  [els.tutorialFocus, els.tutorialClickRing, els.tutorialHand].forEach(element => { element.hidden = !visible; });
}

function clearTutorialTarget() {
  tutorialHandTimeline?.kill?.();
  tutorialHandTimeline = null;
  tutorialTarget = null;
  setTutorialCueVisible(false);
}

function positionTutorial() {
  if (els.onboardingTour.hidden || !tutorialTarget) return;
  const rect = tutorialTargetRect(tutorialTarget);
  if (!rect || !tutorialTargetIsInViewport(rect)) { setTutorialCueVisible(false); return; }
  setTutorialCueVisible(true);
  const padding = onboardingStep === 1 ? 6 : 10;
  const left = Math.max(6, rect.left - padding);
  const top = Math.max(6, rect.top - padding);
  const width = Math.min(innerWidth - left - 6, rect.width + padding * 2);
  const height = Math.min(innerHeight - top - 6, rect.height + padding * 2);
  Object.assign(els.tutorialFocus.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  Object.assign(els.tutorialClickRing.style, { left: `${centerX}px`, top: `${centerY}px` });
  Object.assign(els.tutorialHand.style, { left: `${centerX - (innerWidth <= 640 ? 37 : 48)}px`, top: `${centerY - 8}px` });
  const cardHeight = els.tutorialCard.offsetHeight || 280;
  const cardAtBottom = centerY < innerHeight * .52;
  els.tutorialCard.style.top = cardAtBottom ? "auto" : `${Math.max(12, Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar-height")) + 12)}px`;
  els.tutorialCard.style.bottom = cardAtBottom ? `${innerWidth <= 640 ? 8 : 18}px` : "auto";
  if (innerWidth > 720) {
    els.tutorialCard.style.left = centerX > innerWidth / 2 ? "18px" : "auto";
    els.tutorialCard.style.right = centerX > innerWidth / 2 ? "auto" : "18px";
  } else {
    els.tutorialCard.style.left = "8px";
    els.tutorialCard.style.right = "8px";
  }
  if (!cardAtBottom && top < (els.tutorialCard.offsetHeight || cardHeight) + 100 && innerWidth <= 640) {
    els.tutorialCard.style.top = "auto";
    els.tutorialCard.style.bottom = "8px";
  }
}

function trackTutorialTarget() {
  if (tutorialTrackingFrame) cancelAnimationFrame(tutorialTrackingFrame);
  const trackedTarget = tutorialTarget;
  const track = () => {
    positionTutorial();
    if (!els.onboardingTour.hidden && tutorialTarget === trackedTarget && trackedTarget?.isConnected) tutorialTrackingFrame = requestAnimationFrame(track);
    else tutorialTrackingFrame = null;
  };
  tutorialTrackingFrame = requestAnimationFrame(track);
}

function revealTutorialTarget(target) {
  const scrollContainer = target?.closest?.(".location-panel, .dialog-sheet, .calendar-sheet");
  if (!scrollContainer) return;
  target.scrollIntoView?.({ block: "center", inline: "nearest", behavior: "auto" });
  const containerRect = scrollContainer.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const offset = targetRect.top + targetRect.height / 2 - (containerRect.top + containerRect.height * .52);
  if (Math.abs(offset) > 4) scrollContainer.scrollTop += offset;
}

function playTutorialHandDemo(direction = 1) {
  tutorialHandTimeline?.kill?.();
  if (!tutorialTargetRect(tutorialTarget)) { setTutorialCueVisible(false); return; }
  if (!window.gsap || reducedMotion()) return;
  const pulseTarget = tutorialTarget?.querySelector?.(".hotspot-symbol, .pet-portrait, svg") || tutorialTarget;
  tutorialHandTimeline = gsap.timeline({ repeat: -1, repeatDelay: .45, defaults: { ease: "power3.out" } })
    .fromTo(els.tutorialHand, { x: direction * 44, y: 42, scale: 1.08, rotation: -12, autoAlpha: 0 }, { x: 0, y: 0, scale: 1, rotation: -12, autoAlpha: 1, duration: .52 }, 0)
    .to(els.tutorialHand, { y: 7, scale: .84, duration: .14, ease: "power2.in" }, .58)
    .fromTo(els.tutorialClickRing, { scale: .35, autoAlpha: .9 }, { scale: 1.65, autoAlpha: 0, duration: .48 }, .59)
    .to(pulseTarget, { scale: .92, duration: .12, yoyo: true, repeat: 1, clearProps: "transform" }, .58)
    .to(els.tutorialHand, { y: 0, scale: 1, duration: .22 }, .76)
    .to(els.tutorialHand, { autoAlpha: 0, duration: .24 }, 1.34);
}

function renderOnboardingStep(direction = 1) {
  const step = ONBOARDING_STEPS[onboardingStep];
  prepareTutorialScene(step.scene);
  els.onboardingTitle.textContent = step.title;
  els.onboardingText.textContent = step.text;
  els.onboardingStepLabel.textContent = `${onboardingStep + 1} / ${ONBOARDING_STEPS.length}`;
  els.onboardingZoneLabel.textContent = step.zone;
  els.onboardingDemoText.textContent = step.demo;
  els.onboardingProgress.setAttribute("aria-valuenow", String(onboardingStep + 1));
  [...els.onboardingProgress.children].forEach((item, index) => {
    item.classList.toggle("done", index < onboardingStep);
    item.classList.toggle("active", index === onboardingStep);
  });
  els.onboardingPrev.disabled = onboardingStep === 0;
  els.onboardingNext.textContent = onboardingStep === ONBOARDING_STEPS.length - 1 ? "开始照管" : "下一处";
  clearTutorialTarget();
  requestAnimationFrame(() => {
    const target = step.target();
    if (!tutorialTargetRect(target)) return;
    tutorialTarget = target;
    revealTutorialTarget(tutorialTarget);
    requestAnimationFrame(() => {
      const rect = tutorialTargetRect(tutorialTarget);
      if (!rect || !tutorialTargetIsInViewport(rect)) { clearTutorialTarget(); return; }
      trackTutorialTarget();
      playTutorialHandDemo(direction);
      if (window.gsap && !reducedMotion()) {
        gsap.fromTo(els.tutorialCard, { x: direction * 32, y: 12, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: .42, ease: "power3.out", clearProps: "transform,opacity,visibility" });
        gsap.fromTo(els.tutorialFocus, { scale: .86, autoAlpha: .35 }, { scale: 1, autoAlpha: 1, duration: .38, ease: "power3.out", clearProps: "transform,opacity,visibility" });
      }
    });
  });
}

function finishOnboarding(message = "功能引导完成，已经带你进入家园照料区。") {
  localStorage.setItem("valleySanctuaryOnboardingV2", "1");
  if (tutorialTrackingFrame) cancelAnimationFrame(tutorialTrackingFrame);
  tutorialTrackingFrame = null;
  closeTutorialPreviewDialogs();
  els.onboardingTour.hidden = true;
  clearTutorialTarget();
  toast(message);
  els.locationPanel?.focus({ preventScroll: true });
}

function openOnboarding() {
  if (els.helpDialog.open) els.helpDialog.close();
  onboardingStep = 0;
  els.onboardingTour.hidden = false;
  renderOnboardingStep();
}

function archiveCalendarDay() {
  state.calendarHistory[String(state.day)] = {
    weather: state.weather,
    events: state.daily.events,
    activities: state.daily.activities,
    care: state.daily.care,
    randomEvents: state.daily.randomEvents,
    coins: state.daily.coins,
    reputation: state.daily.reputation,
    routine: bestRoutineDoneCount(),
    petRoutines: Object.fromEntries(state.ownedPetIds.map(id => [id, routineDoneCount(id)])),
    locations: [...state.daily.locations],
    pets: [...state.daily.pets],
    ownedPets: state.ownedPetIds.length,
    careStreak: state.careStreak
  };
}

function nextDay() {
  const previousWeather = state.weather;
  const routineTargetMet = bestRoutineDoneCount() >= 4;
  state.careStreak = routineTargetMet ? state.careStreak + 1 : 0;
  state.bestCareStreak = Math.max(state.bestCareStreak, state.careStreak);
  const streakMilestone = careStreakMilestone(state.careStreak);
  archiveCalendarDay();
  state.ownedPetIds.forEach(id => {
    const stats = statsFor(id);
    const routineScore = routineDoneCount(id);
    const rested = stats.sleepMinutes >= 120 || stats.asleep;
    const careAverage = (stats.hunger + stats.clean + stats.mood + stats.energy + stats.health + stats.comfort + (100 - stats.stress)) / 7;
    stats.growth += routineScore * 3 + Math.floor(careAverage / 20);
    stats.ageDays += 1;
    stats.health = clamp(stats.health + (rested ? 3 : -4), 0, 100);
    stats.energy = clamp(stats.energy + (rested ? 16 : -8), 0, 100);
    stats.hunger = clamp(stats.hunger - 8, 0, 100);
    stats.mood = clamp(stats.mood + (routineScore >= 4 ? 6 : -2), 0, 100);
    stats.comfort = clamp(stats.comfort + (rested ? 4 : -3), 0, 100);
    stats.stress = clamp(stats.stress + (routineScore >= 4 ? -4 : 3), 0, 100);
    stats.asleep = false;
    stats.sleepMinutes = 0;
  });
  state.day += 1;
  state.minutes = 420;
  state.daily = defaultDaily();
  state.petRoutines = Object.fromEntries(state.ownedPetIds.map(id => [id, defaultRoutine(state.day)]));
  state.contractDay = 0;
  state.contractIds = [];
  state.claimedContracts = [];
  state.randomEventDay = 0;
  state.randomEventIds = [];
  state.weather = weatherForDay(state.day);
  if (streakMilestone) grantManagementReward(streakMilestone.reward);
  showWorld(); renderAll(); saveState();
  const weather = WEATHER[state.weather];
  playWeatherTransition(previousWeather, state.weather);
  toast(`${routineTargetMet ? `照管连胜 ${state.careStreak} 天。` : "今天的生活日程没有达到连胜条件。"}${streakMilestone ? ` ${streakMilestone.label}，获得${rewardSummary(streakMilestone.reward)}。` : ""}今日天气：${weather.label}。${weather.note}。`);
}

function renderCalendar(options = {}) {
  const monthStart = calendarMonthStart(calendarViewMonth);
  const currentMonth = calendarMonthForDay(state.day);
  els.calendarMonthLabel.textContent = `${calendarSeason(calendarViewMonth)} · 第 ${calendarViewMonth} 月`;
  els.calendarPrev.disabled = calendarViewMonth <= 1;
  els.calendarToday.disabled = calendarViewMonth === currentMonth && calendarSelectedDay === state.day;
  const days = Array.from({ length: CALENDAR_DAYS }, (_, index) => calendarDayInfo(monthStart + index));
  els.calendarGrid.innerHTML = days.map(info => {
    const primary = info.schedule[0];
    const selected = info.day === calendarSelectedDay;
    const completed = info.history ? info.history.events + info.history.activities : 0;
    const classes = [info.isPast ? "past" : "future", info.isToday ? "today" : "", selected ? "selected" : "", primary.kind === "节庆" || primary.kind === "里程碑" ? "festival" : ""].filter(Boolean).join(" ");
    const stateLabel = info.isToday ? "今天" : info.isPast ? (info.history ? `已结算，完成 ${completed} 项` : "往日") : "待安排";
    return `<button type="button" role="gridcell" class="calendar-day ${classes}" data-calendar-day="${info.day}" aria-selected="${selected}" aria-label="第 ${info.day} 天，${primary.title}，${stateLabel}">
      <span class="calendar-date"><b>${info.date}</b></span>
      <span class="calendar-marker ${primary.kind === "节庆" || primary.kind === "里程碑" ? "special" : ""}">${primary.kind}</span>
      <strong>${primary.title}</strong>
      <small>${info.isPast && info.history ? `已完成 ${completed} 项` : primary.time}</small>
    </button>`;
  }).join("");
  els.calendarGrid.querySelectorAll("[data-calendar-day]").forEach(button => button.addEventListener("click", () => {
    calendarSelectedDay = Number(button.dataset.calendarDay);
    renderCalendar({ selection: true });
  }));
  els.calendarGrid.querySelectorAll("[data-calendar-day]").forEach(button => button.addEventListener("keydown", event => {
    const movement = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key];
    if (!movement) return;
    event.preventDefault();
    const nextDay = clamp(Number(button.dataset.calendarDay) + movement, monthStart, monthStart + CALENDAR_DAYS - 1);
    calendarSelectedDay = nextDay;
    renderCalendar({ selection: true });
    els.calendarGrid.querySelector(`[data-calendar-day="${nextDay}"]`)?.focus({ preventScroll: true });
  }));
  renderCalendarDetail(calendarDayInfo(calendarSelectedDay));
  if (els.calendarDialog.open && (options.selection || options.monthDirection)) animateCalendarContent(options);
}

function animateCalendarContent({ selection = false, monthDirection = 0 } = {}) {
  if (!window.gsap || reducedMotion()) return;
  const selected = els.calendarGrid.querySelector(".calendar-day.selected");
  if (selection && selected) {
    gsap.fromTo(selected, { scale: .78, y: 10, boxShadow: "0 0 0 12px rgba(233,181,72,.36)" }, { scale: 1, y: 0, boxShadow: "0 0 0 4px rgba(45,97,65,.13)", duration: .46, ease: "power4.out", clearProps: "transform" });
  }
  if (monthDirection) {
    const days = [...els.calendarGrid.children];
    gsap.fromTo(days, { x: monthDirection * 40, y: 10, scale: .9, autoAlpha: 0 }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: .42, stagger: { each: .012, amount: .3 }, ease: "power3.out", clearProps: "transform,opacity,visibility" });
    gsap.fromTo(els.calendarMonthLabel, { x: monthDirection * 18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .36, ease: "power3.out", clearProps: "transform,opacity,visibility" });
  }
}

function renderCalendarDetail(info) {
  const history = info.history;
  const stateLabel = info.isToday ? "今日运行中" : info.isPast ? "经营记录" : "未来计划";
  const historyMarkup = info.isPast ? (history ? `
    <div class="calendar-outcomes" aria-label="当日经营结果">
      <span><small>事件与活动</small><b>${history.events + history.activities}</b></span>
      <span><small>生活日程</small><b>${history.routine} / 5</b></span>
      <span><small>金币收入</small><b>${history.coins}</b></span>
      <span><small>口碑增长</small><b>${history.reputation}</b></span>
      <span><small>照管连胜</small><b>${history.careStreak || 0} 天</b></span>
    </div>
    <p class="calendar-record-note">照管 ${history.pets.length} 位伙伴，到访 ${history.locations.length} 个地点，日末家园共有 ${history.ownedPets} 位伙伴。</p>` : `<p class="calendar-record-note">这一天早于日历启用时间，没有留存经营明细。</p>`) : "";
  els.calendarDetail.innerHTML = `
    <div class="calendar-detail-heading"><span>${stateLabel}</span><b>第 ${info.day} 天 · ${info.weekday}</b></div>
    <div class="calendar-schedule" aria-label="当日安排">${info.schedule.map(item => {
      const locked = !locationUnlocked(item.location);
      const closedToday = info.isToday ? weatherBlockReason(item.location) : "";
      return `<div class="calendar-agenda"><time>${item.time}</time><span><em>${item.kind}</em><b>${item.title}</b><small>${item.note}</small></span>${info.isToday ? `<button type="button" data-calendar-go="${item.location}" ${locked || closedToday ? "disabled" : ""}>${locked ? `Lv.${LOCATIONS[item.location].level} 解锁` : closedToday ? "今日暂停" : "前往"}</button>` : ""}</div>`;
    }).join("")}</div>
    ${historyMarkup}`;
  els.calendarDetail.querySelectorAll("[data-calendar-go]").forEach(button => button.addEventListener("click", () => {
    els.calendarDialog.close();
    enterLocation(button.dataset.calendarGo);
  }));
  if (els.calendarDialog.open && window.gsap && !reducedMotion()) {
    gsap.fromTo(els.calendarDetail.children, { x: 26, y: 8, scale: .97, opacity: .08 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: .4, stagger: .055, ease: "power3.out", overwrite: "auto", clearProps: "transform,opacity" });
  }
}

function openCalendar() {
  calendarViewMonth = calendarMonthForDay(state.day);
  calendarSelectedDay = state.day;
  renderCalendar();
  els.calendarDialog.showModal();
  animateCalendarOpen();
}

function animateCalendarOpen() {
  calendarOpenTimeline?.kill?.();
  const pages = els.calendarDialog.querySelectorAll(".calendar-page");
  if (!window.gsap || reducedMotion()) { pages.forEach(page => { page.style.visibility = "hidden"; }); return; }
  const leftPage = els.calendarDialog.querySelector(".calendar-page-left");
  const rightPage = els.calendarDialog.querySelector(".calendar-page-right");
  const sheet = els.calendarDialog.querySelector(".calendar-sheet");
  const hero = els.calendarDialog.querySelector(".calendar-hero");
  const cells = [...els.calendarGrid.children];
  gsap.set(leftPage, { autoAlpha: 1, rotationY: 86, transformOrigin: "right center" });
  gsap.set(rightPage, { autoAlpha: 1, rotationY: -86, transformOrigin: "left center" });
  calendarOpenTimeline = gsap.timeline({ defaults: { ease: "power3.out" } })
    .fromTo(sheet, { y: 46, scale: .88, rotationX: -7, autoAlpha: .08 }, { y: 0, scale: 1, rotationX: 0, autoAlpha: 1, duration: .5 }, 0)
    .fromTo(hero, { clipPath: "inset(0 48% 0 48%)", filter: "brightness(.65)" }, { clipPath: "inset(0 0% 0 0%)", filter: "brightness(1)", duration: .56 }, .05)
    .fromTo(els.calendarDialog.querySelector(".calendar-hero > div"), { x: -28, y: 16, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: .45 }, .18)
    .to(leftPage, { rotationY: 0, duration: .58 }, .08)
    .to(rightPage, { rotationY: 0, duration: .58 }, .12)
    .to(pages, { scale: .985, autoAlpha: 0, duration: .2 }, .62)
    .set(pages, { visibility: "hidden" })
    .fromTo(els.calendarDialog.querySelector(".calendar-toolbar"), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .34 }, .48)
    .fromTo(els.calendarDialog.querySelectorAll(".calendar-weekdays span"), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .3, stagger: .025 }, .54)
    .fromTo(cells, { y: 22, scale: .82, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: .38, stagger: { each: .014, amount: .32 }, clearProps: "transform,opacity,visibility" }, .56)
    .fromTo(els.calendarDetail, { x: 36, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .42, clearProps: "transform,opacity,visibility" }, .66);
}

function renderInventory() {
  if (!INVENTORY_ITEMS[state.selectedInventoryId]) state.selectedInventoryId = "food";
  els.backpackCapacity.textContent = `${backpackUsed()} / ${state.backpackCapacity}`;
  els.inventoryGrid.innerHTML = Object.entries(INVENTORY_ITEMS).map(([id, item]) => `<button class="inventory-item ${id === state.selectedInventoryId ? "active" : ""}" data-inventory-item="${id}" aria-pressed="${id === state.selectedInventoryId}"><svg aria-hidden="true"><use href="assets/sprites.svg#${item.icon}"></use></svg><b>${state.inventory[id] || 0}</b><small>${item.label}</small></button>`).join("");
  els.inventoryGrid.querySelectorAll("[data-inventory-item]").forEach(button => button.addEventListener("click", () => { state.selectedInventoryId = button.dataset.inventoryItem; renderInventory(); }));
  renderInventoryDetail();
  const petRoutine = routineFor(state.activePetId);
  els.routineSummary.innerHTML = `<div class="section-heading"><b>${petById(state.activePetId).name}的今日生活</b><span>${routineDoneCount(state.activePetId)} / 5</span></div><div class="routine-track">${routineSteps().map(step => `<span class="routine-step ${petRoutine[step.id] ? "done" : ""}"><i>${petRoutine[step.id] ? "✓" : ""}</i>${step.label}</span>`).join("")}</div>`;
}

function renderInventoryDetail() {
  const id = state.selectedInventoryId;
  const item = INVENTORY_ITEMS[id];
  const count = state.inventory[id] || 0;
  const pet = petById(state.activePetId);
  const sleeping = statsFor(state.activePetId).asleep;
  const stats = statsFor(state.activePetId);
  const blocked = count < 1 ? "没有库存" : sleeping ? "正在睡觉" : item.pets && !item.pets.includes(pet.id) ? `仅适合${item.pets.map(id => petById(id).name).join("、")}` : ["food", "fish", "carrot"].includes(id) && stats.hunger >= 86 ? "已经吃饱" : id === "treat" && stats.hunger >= 94 ? "不再需要零食" : id === "soap" && stats.clean >= 92 ? "已经很干净" : "";
  els.inventoryDetail.innerHTML = `<span class="inventory-detail-icon"><svg aria-hidden="true"><use href="assets/sprites.svg#${item.icon}"></use></svg></span><div><b>${item.label}</b><p>${item.note}。当前伙伴：${pet.name}。</p></div>${item.persistent ? `<span class="persistent-label">持有生效</span>` : `<button class="primary-button" data-use-item="${id}" ${blocked ? "disabled" : ""}>${blocked || "使用 1 份"}</button>`}`;
  els.inventoryDetail.querySelector("[data-use-item]")?.addEventListener("click", () => useInventoryItem(id));
}

function useInventoryItem(id) {
  const item = INVENTORY_ITEMS[id];
  if (!item || item.persistent || (state.inventory[id] || 0) < 1) return;
  const petId = state.activePetId;
  const stats = statsFor(petId);
  if (stats.asleep) { toast("先轻声叫醒它，再使用物资。" ); return; }
  if (item.pets && !item.pets.includes(petId)) { toast(`${item.label}不适合当前伙伴。`); return; }
  if (["food", "fish", "carrot"].includes(id) && stats.hunger >= 86) { toast("已经吃饱，稍后再喂。" ); return; }
  if (id === "treat" && stats.hunger >= 94) { toast("今天不再需要零食。" ); return; }
  if (id === "soap" && stats.clean >= 92) { toast("毛发已经很干净。" ); return; }
  state.inventory[id] -= 1;
  applyReward(item.effect, petId);
  const routineMap = { food: "breakfast", fish: "breakfast", carrot: "breakfast", treat: "bond", toy: "bond", soap: "clean" };
  if (routineMap[id]) markRoutine(routineMap[id], petId);
  const pet = petById(petId);
  const favoriteMap = { food: "feed", treat: "treat", toy: "play", soap: "bath" };
  if (favoriteMap[id] === pet.favoriteAction) {
    stats.trust = clamp(stats.trust + 2, 0, 100);
    stats.growth += 3;
  }
  if (state.view === "location") showPet(petId, item.action);
  setTimeout(() => { if (!state.miniGameActive && state.view === "location") showPet(state.activePetId, "idle"); }, 1200);
  playPetVoice(petId, id === "medicine" ? "soft" : "happy");
  playFoley(id === "toy" ? "ball" : id === "soap" ? "pop" : "success");
  toast(`${pet.name}使用了${item.label}。`);
  renderAll();
  renderInventory();
  if (state.view === "location") renderLocationPanel();
  saveState();
}

function renderJournal() {
  const contracts = dailyContracts();
  const completedAchievements = ACHIEVEMENTS.filter(achievement => state.achievementsClaimed.includes(achievement.id)).length;
  const weather = WEATHER[state.weather] || WEATHER.clear;
  els.journalContent.innerHTML = `
    <div class="journal-summary">
      <span><small>家园等级</small><b>Lv.${sanctuaryLevel()}</b></span>
      <span><small>到访地点</small><b>${Object.keys(state.records.locations).length} / ${Object.keys(LOCATIONS).length}</b></span>
      <span><small>完成事件</small><b>${state.records.events}</b></span>
      <span><small>照管连胜</small><b>${state.careStreak} 天${state.bestCareStreak > state.careStreak ? ` · 最佳 ${state.bestCareStreak}` : ""}</b></span>
      <span><small>互动评级</small><b>${state.records.miniGames} 次${state.records.perfectGames ? ` · S ${state.records.perfectGames}` : ""}${state.records.bestCombo ? ` · 连击 ×${state.records.bestCombo}` : ""}</b></span>
      <span><small>今日天气</small><b>${weather.label}</b></span>
    </div>
    <div class="journal-heading"><b>玩法熟练度</b><span>难度随完成次数提升</span></div>
    <div class="mastery-list">${miniMasterySummary().map(item => `<span class="mastery-row" data-mastery-tier="${item.tier}"><b>${item.label}</b><small>${item.difficulty} · 完成 ${item.plays} 次</small><em>${item.bestRating ? `最佳 ${item.bestRating}` : "未评级"}${item.bestCombo ? ` · ×${item.bestCombo}` : ""}</em></span>`).join("") || `<p class="mastery-empty">还没有完成过小游戏，先从家园照料开始。</p>`}</div>
    <div class="journal-heading"><b>今日委托</b><span>${state.claimedContracts.length} / ${contracts.length} 已领取</span></div>
    <div class="journal-list">${contracts.map(contract => {
      const progress = contractProgress(contract);
      const claimed = state.claimedContracts.includes(contract.id);
      const ready = progress >= contract.target;
      const fits = rewardFitsBackpack(contract.reward);
      return `<div class="journal-row ${ready ? "ready" : ""}"><div><b>${contract.label}</b><small>${contract.note}</small><div class="journal-progress"><i style="--progress:${progress / contract.target * 100}%"></i></div></div><div class="journal-row-meta"><span>${progress} / ${contract.target}</span><small>${rewardLabels(contract.reward)}</small><button type="button" data-claim-contract="${contract.id}" ${!ready || claimed || !fits ? "disabled" : ""}>${claimed ? "已领取" : ready && !fits ? "背包已满" : ready ? "领取" : "进行中"}</button></div></div>`;
    }).join("")}</div>
    <div class="journal-heading"><b>长期成就</b><span>${completedAchievements} / ${ACHIEVEMENTS.length}</span></div>
    <div class="journal-list achievement-list">${ACHIEVEMENTS.map(achievement => {
      const progress = Math.min(achievement.target, achievementProgress(achievement));
      const claimed = state.achievementsClaimed.includes(achievement.id);
      const ready = progress >= achievement.target;
      const fits = rewardFitsBackpack(achievement.reward);
      return `<div class="journal-row ${ready ? "ready" : ""}"><div><b>${achievement.label}</b><small>${achievement.note}</small><div class="journal-progress"><i style="--progress:${progress / achievement.target * 100}%"></i></div></div><div class="journal-row-meta"><span>${progress} / ${achievement.target}</span><small>${rewardLabels(achievement.reward)}</small><button type="button" data-claim-achievement="${achievement.id}" ${!ready || claimed || !fits ? "disabled" : ""}>${claimed ? "已完成" : ready && !fits ? "背包已满" : ready ? "领取" : "未达成"}</button></div></div>`;
    }).join("")}</div>`;
  els.journalContent.querySelectorAll("[data-claim-contract]").forEach(button => button.addEventListener("click", () => claimContract(button.dataset.claimContract)));
  els.journalContent.querySelectorAll("[data-claim-achievement]").forEach(button => button.addEventListener("click", () => claimAchievement(button.dataset.claimAchievement)));
}

function claimContract(id) {
  const contract = dailyContracts().find(item => item.id === id);
  if (!contract || state.claimedContracts.includes(id) || contractProgress(contract) < contract.target || !rewardFitsBackpack(contract.reward)) return;
  state.claimedContracts.push(id);
  grantManagementReward(contract.reward);
  toast(`完成今日委托“${contract.label}”`);
  playFoley("success");
  renderAll();
  renderJournal();
}

function claimAchievement(id) {
  const achievement = ACHIEVEMENTS.find(item => item.id === id);
  if (!achievement || state.achievementsClaimed.includes(id) || achievementProgress(achievement) < achievement.target || !rewardFitsBackpack(achievement.reward)) return;
  state.achievementsClaimed.push(id);
  grantManagementReward(achievement.reward);
  toast(`达成成就“${achievement.label}”`);
  playFoley("success");
  renderAll();
  renderJournal();
}

function petFramePath(petId, action = "idle", frame = 0) { return action === "sleep" ? `assets/pets/actions/${petId}/sleep.webp` : `assets/pets/actions/${petId}/${action}-${frame}.webp`; }
function stopPetFrames(element) { const timer = frameTimers.get(element); if (timer) clearInterval(timer); frameTimers.delete(element); }
function startPetFrameLoop(element, petId, action, interval) {
  stopPetFrames(element);
  let frame = 0;
  element.src = petFramePath(petId, action, frame);
  frameTimers.set(element, setInterval(() => { frame = frame ? 0 : 1; element.src = petFramePath(petId, action, frame); }, interval));
}
function startIdleBlinkLoop(element, petId) {
  stopPetFrames(element);
  element.src = petFramePath(petId, "idle", 0);
  const schedule = delay => frameTimers.set(element, setTimeout(blink, delay));
  const blink = () => {
    if (!element.isConnected) return;
    element.src = petFramePath(petId, "idle", 1);
    frameTimers.set(element, setTimeout(() => {
      if (!element.isConnected) return;
      element.src = petFramePath(petId, "idle", 0);
      if (Math.random() < .16) schedule(150 + Math.random() * 90);
      else schedule(3600 + Math.random() * 5200);
    }, 145 + Math.random() * 75));
  };
  schedule(2600 + Math.random() * 4200);
}
function showPet(id, action = "idle") {
  const pet = petById(id) || petById(state.activePetId);
  clearTimeout(idleBehaviorTimer);
  idleTween?.kill?.();
  const sleeping = state.location === "home" && state.ownedPetIds.includes(pet.id) && statsFor(pet.id).asleep;
  const visibleAction = sleeping ? "sleep" : action;
  if (sleeping) {
    stopPetFrames(els.petSprite);
    els.petSprite.src = petFramePath(pet.id, "sleep");
  } else if (visibleAction === "idle") startIdleBlinkLoop(els.petSprite, pet.id);
  else startPetFrameLoop(els.petSprite, pet.id, visibleAction, 620);
  els.petSprite.alt = `${pet.name}正在${action === "idle" ? "观察周围" : "互动"}`;
  els.petSprite.dataset.petId = pet.id;
  els.petSprite.dataset.action = visibleAction;
  els.sleepNest.dataset.petId = pet.id;
  els.petSprite.classList.toggle("is-sleeping", sleeping);
  renderSleepState();
  if (sleeping) startSleepMotion();
  else if (visibleAction === "idle") scheduleIdleBehavior(pet.id);
}

function showMiniPetPose(petId, action) {
  const miniPet = $("#miniPet");
  if (!miniPet) return;
  miniPet.src = petFramePath(petId, action, 1);
  if (window.gsap && !reducedMotion()) gsap.fromTo(miniPet, { y: 0, scale: 1 }, { y: -7, scale: 1.025, duration: .48, yoyo: true, repeat: 1, ease: "sine.inOut" });
  setTimeout(() => { if (miniPet.isConnected) miniPet.src = petFramePath(petId, action, 0); }, 920);
}

function scheduleIdleBehavior(petId) {
  clearTimeout(idleBehaviorTimer);
  if (els.location.hidden || state.miniGameActive || reducedMotion()) return;
  idleBehaviorTimer = setTimeout(() => playIdleBehavior(petId), 3200 + Math.random() * 2800);
}

function playIdleBehavior(petId) {
  if (els.location.hidden || state.miniGameActive || els.petSprite.dataset.petId !== petId || els.petSprite.dataset.action !== "idle") return;
  const pet = petById(petId);
  const stats = statsFor(petId);
  const options = [pet.idleStyle, "look", "stretch"];
  if (stats.energy < 38) options.push("doze", "doze");
  if (isPetActiveNow(pet)) options.push("step");
  if (pet.bird) options.push("hop", "wingStretch", "preen");
  if (state.weather === "thunderstorm") options.push("alert", "shelter", pet.bird ? "alert" : "look");
  const behavior = options[Math.floor(Math.random() * options.length)];
  const actionByBehavior = { sniff: "affection", groom: "affection", wash: "affection", preen: "affection", prance: "play", step: "play", hop: "play", wingStretch: "play", stretch: "affection", doze: "idle", listen: "idle", crest: "idle", alert: "idle", shelter: "idle", look: "idle" };
  const action = actionByBehavior[behavior] || "idle";
  if (action === "idle") startIdleBlinkLoop(els.petSprite, petId);
  else startPetFrameLoop(els.petSprite, petId, action, 680);
  if (!window.gsap) { startIdleBlinkLoop(els.petSprite, petId); scheduleIdleBehavior(petId); return; }
  const finish = () => {
    if (els.petSprite.dataset.petId !== petId || state.miniGameActive) return;
    gsap.set(els.petSprite, { clearProps: "transform" });
    els.petSprite.dataset.action = "idle";
    startIdleBlinkLoop(els.petSprite, petId);
    scheduleIdleBehavior(petId);
  };
  idleTween = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete: finish });
  if (behavior === "sniff") idleTween.to(els.petSprite, { x: 24, y: 5, rotation: -3, scaleY: .94, duration: .72 }).to(els.petSprite, { x: 8, rotation: 1.8, duration: .7 }).to(els.petSprite, { x: 0, y: 0, rotation: 0, scaleY: 1, duration: .66 });
  else if (["groom", "wash", "preen"].includes(behavior)) idleTween.to(els.petSprite, { rotation: -4, scale: .965, y: 5, duration: .72 }).to(els.petSprite, { rotation: 3, duration: .52, repeat: 1, yoyo: true }).to(els.petSprite, { rotation: 0, scale: 1, y: 0, duration: .68 });
  else if (behavior === "listen") idleTween.to(els.petSprite, { rotation: -3, scaleY: 1.04, y: -4, duration: .62 }).to(els.petSprite, { rotation: 4, duration: .9 }).to(els.petSprite, { rotation: 0, scaleY: 1, y: 0, duration: .7 });
  else if (["prance", "step", "hop"].includes(behavior)) idleTween.to(els.petSprite, { x: 22, y: -18, rotation: 2, duration: .44 }).to(els.petSprite, { x: -8, y: 0, rotation: -1, duration: .58 }).to(els.petSprite, { x: 0, y: -12, rotation: 1, duration: .42 }).to(els.petSprite, { y: 0, rotation: 0, duration: .56 });
  else if (behavior === "wingStretch") idleTween.to(els.petSprite, { scaleX: 1.1, scaleY: .98, y: -3, duration: .75 }).to(els.petSprite, { scaleX: 1.04, rotation: 2, duration: .7 }).to(els.petSprite, { scale: 1, rotation: 0, y: 0, duration: .9 });
  else if (behavior === "alert") idleTween.to(els.petSprite, { y: -4, scaleY: 1.035, x: -5, duration: .35 }).to(els.petSprite, { rotation: -2, duration: .52 }).to(els.petSprite, { rotation: 1.4, duration: .72 }).to(els.petSprite, { rotation: 0, y: 0, scaleY: 1, x: 0, duration: .85 });
  else if (behavior === "shelter") idleTween.to(els.petSprite, { x: -18, y: 6, scaleY: .95, duration: 1.1 }).to(els.petSprite, { x: -15, y: 8, duration: 1.4 }).to(els.petSprite, { x: 0, y: 0, scaleY: 1, duration: 1.05 });
  else if (behavior === "stretch") idleTween.to(els.petSprite, { scaleX: 1.045, scaleY: .955, y: 7, duration: 1.05 }).to(els.petSprite, { scaleX: .99, scaleY: 1.025, y: -2, duration: .82 }).to(els.petSprite, { scale: 1, y: 0, duration: .9 });
  else if (behavior === "doze") idleTween.to(els.petSprite, { rotation: -2.2, y: 6, scaleY: .955, duration: 1.35 }).to(els.petSprite, { y: 3, duration: 1.15, repeat: 1, yoyo: true }).to(els.petSprite, { rotation: 0, y: 0, scaleY: 1, duration: 1 });
  else idleTween.to(els.petSprite, { rotation: -1.4, x: -6, duration: .9 }).to(els.petSprite, { rotation: 1.4, x: 6, duration: 1.25 }).to(els.petSprite, { rotation: 0, x: 0, duration: .9 });
}

function startSleepMotion() {
  clearTimeout(idleBehaviorTimer);
  idleTween?.kill?.();
  if (!window.gsap || reducedMotion() || els.location.hidden) return;
  idleTween = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } })
    .to(els.petSprite, { scaleY: .982, scaleX: 1.009, y: 2, rotation: -.5, duration: 3.4 })
    .to(els.petSprite, { scaleY: .994, scaleX: 1.003, y: 0, rotation: .25, duration: 3 });
}

function renderSleepState() {
  const stats = statsFor(state.activePetId);
  const visible = state.view === "location" && state.location === "home" && stats.asleep;
  const bedPosition = furnitureScenePosition("starter-bed");
  els.location.style.setProperty("--sleep-x", `${bedPosition.x}%`);
  els.location.style.setProperty("--sleep-y", `${bedPosition.y}%`);
  els.location.style.setProperty("--sleep-rotate", `${bedPosition.rotation || 0}deg`);
  els.location.style.setProperty("--sleep-scale", String(bedPosition.scale || 1));
  els.sleepDuration.textContent = `${stats.sleepMinutes} 分钟`;
  els.sleepStatus.hidden = !visible;
  els.sleepNest.hidden = !visible;
  if (visible) {
    startSnoreLoop();
  } else stopSnoreLoop();
}

function speak(message) {
  els.speech.textContent = message;
  if (window.gsap && !reducedMotion()) gsap.fromTo(els.speech, { y: 16, scale: .92, opacity: .12 }, { y: 0, scale: 1, opacity: 1, duration: .42, ease: "power3.out", clearProps: "transform,opacity" });
}

function reducedMotion() { return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches; }

function toast(message) {
  const element = document.createElement("div");
  element.className = "toast";
  element.textContent = message;
  els.toast.append(element);
  if (window.gsap && !reducedMotion()) {
    gsap.timeline({ onComplete: () => element.remove() })
      .fromTo(element, { x: 44, scale: .88, autoAlpha: 0 }, { x: 0, scale: 1, autoAlpha: 1, duration: .4, ease: "power3.out" })
      .to(element, { x: 18, scale: .96, autoAlpha: 0, duration: .3, ease: "power2.in" }, 2.55);
  } else setTimeout(() => element.remove(), 3000);
}

function ensureAudioContext() {
  if (state.muted) return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  try {
    audioContext ||= new AudioContextClass();
    if (!audioMaster && audioContext.createGain) {
      audioMaster = audioContext.createGain();
      audioMaster.gain.value = .82;
      audioMaster.connect(audioContext.destination);
    }
    if (audioContext.state === "suspended") audioContext.resume()?.catch?.(() => {});
  } catch { return null; }
  updateWeatherAmbience();
  return audioContext;
}

function audioOutput(context = audioContext) { return audioMaster || context?.destination; }

function unlockAudio() {
  if (!ensureAudioContext() || state.muted) return;
  playFoley("tap");
}

function stopWeatherAmbience() {
  if (!weatherAmbience) return;
  clearTimeout(weatherAmbience.thunderTimer);
  try { weatherAmbience.source.stop(); } catch {}
  weatherAmbience.source.disconnect?.();
  weatherAmbience = null;
}

function updateWeatherAmbience() {
  const rainWeather = ["drizzle", "rain", "heavyRain", "thunderstorm"];
  if (state.muted || !audioContext || ![...rainWeather, "wind"].includes(state.weather)) { stopWeatherAmbience(); return; }
  if (weatherAmbience?.weather === state.weather) return;
  if (!audioContext.createBuffer || !audioContext.createBufferSource || !audioContext.createBiquadFilter) return;
  stopWeatherAmbience();
  const sampleRate = audioContext.sampleRate || 44100;
  const buffer = audioContext.createBuffer(1, sampleRate * 2, sampleRate);
  const data = buffer.getChannelData(0);
  let previous = 0;
  for (let index = 0; index < data.length; index += 1) {
    const noise = Math.random() * 2 - 1;
    previous = state.weather === "wind" ? previous * .985 + noise * .015 : noise;
    data[index] = previous;
  }
  const source = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  source.buffer = buffer;
  source.loop = true;
  filter.type = rainWeather.includes(state.weather) ? "highpass" : "lowpass";
  filter.frequency.value = state.weather === "drizzle" ? 1450 : rainWeather.includes(state.weather) ? 760 : 520;
  gain.gain.value = { drizzle: .011, rain: .02, heavyRain: .032, thunderstorm: .038, wind: .026 }[state.weather] || .018;
  source.connect(filter).connect(gain).connect(audioOutput(audioContext));
  source.start();
  weatherAmbience = { weather: state.weather, source };
  if (state.weather === "thunderstorm") scheduleThunderRumble(true);
}

function playThunderRumble() {
  if (!audioContext || state.weather !== "thunderstorm" || state.muted) return;
  const now = audioContext.currentTime;
  const output = audioOutput(audioContext);
  [[62, 31, .18, "sine"], [118, 42, .07, "triangle"]].forEach(([startFrequency, endFrequency, volume, type]) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(startFrequency + Math.random() * 9, now);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + 2.2);
    gain.gain.setValueAtTime(.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + .16);
    gain.gain.exponentialRampToValueAtTime(.001, now + 2.45);
    oscillator.connect(gain).connect(output);
    oscillator.start(now);
    oscillator.stop(now + 2.5);
  });
}

function scheduleThunderRumble(initial = false) {
  if (!weatherAmbience || weatherAmbience.weather !== "thunderstorm" || state.muted) return;
  weatherAmbience.thunderTimer = setTimeout(() => {
    if (!audioContext || state.weather !== "thunderstorm" || state.muted) return;
    playThunderRumble();
    scheduleThunderRumble();
  }, initial ? 850 : 4200 + Math.random() * 3600);
}

function playFoley(kind) {
  if (kind === "miss" && state.miniGameActive) registerMiniMiss();
  const context = ensureAudioContext();
  if (!context) return;
  const presets = { bite: [250, .07], chew: [215, .055], ball: [390, .09], tap: [520, .06], pop: [680, .05], brush: [180, .12], coin: [780, .1], success: [620, .14], event: [460, .16], cast: [340, .13], splash: [190, .16], reel: [510, .16], soil: [115, .1], step: [245, .055], pull: [165, .18], throw: [440, .12], land: [145, .12], miss: [130, .09], settle: [170, .18], scratch: [125, .1], rustle: [290, .08], sniff: [155, .085], listen: [610, .075], flutter: [740, .065], clockTick: [1080, .035], clockChime: [680, .18] };
  const [frequency, duration] = presets[kind] || [400, .07];
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = kind === "brush" ? "sine" : "triangle";
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.16, context.currentTime + duration);
  gain.gain.setValueAtTime(.12, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
  oscillator.connect(gain).connect(audioOutput(context));
  oscillator.start(); oscillator.stop(context.currentTime + duration);
}

function playEatingSound() {
  [0, 145, 315, 510].forEach((delay, index) => setTimeout(() => playFoley(index % 2 ? "chew" : "bite"), delay));
}

function playSnoreBreath() {
  const context = ensureAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(82 + Math.random() * 10, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(58, context.currentTime + 1.25);
  gain.gain.setValueAtTime(.001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(.065, context.currentTime + .38);
  gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + 1.35);
  oscillator.connect(gain).connect(audioOutput(context));
  oscillator.start(); oscillator.stop(context.currentTime + 1.4);
}

function startSnoreLoop() {
  if (snoreTimer || state.muted || state.view !== "location" || state.location !== "home" || !statsFor(state.activePetId).asleep) return;
  playSnoreBreath();
  snoreTimer = setTimeout(() => { snoreTimer = null; startSnoreLoop(); }, 2500 + Math.random() * 900);
}

function stopSnoreLoop() { clearTimeout(snoreTimer); snoreTimer = null; }

function playSmallPetVoice(petId, energy = "soft") {
  const context = ensureAudioContext();
  if (!context) return;
  const profiles = {
    rabbit: [[610, 760, .16], [680, 840, .12]],
    hamster: [[420, 560, .12], [500, 640, .1], [455, 590, .08]]
  };
  const notes = profiles[petId] || profiles.rabbit;
  const volume = energy === "happy" ? .055 : energy === "alert" ? .045 : .038;
  const now = context.currentTime;
  notes.slice(0, energy === "happy" ? notes.length : 1 + Math.round(Math.random())).forEach(([from, to, duration], index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * .13;
    oscillator.type = petId === "rabbit" ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(from * (0.96 + Math.random() * .08), start);
    oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);
    gain.gain.setValueAtTime(.001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + .035);
    gain.gain.exponentialRampToValueAtTime(.001, start + duration + .04);
    oscillator.connect(gain).connect(audioOutput(context));
    oscillator.start(start);
    oscillator.stop(start + duration + .06);
  });
}

function playPetVoice(petId, energy = "soft") {
  if (state.muted) return;
  const available = [1,2,3].filter(index => index !== lastVoiceVariant[petId]);
  const variant = available[Math.floor(Math.random() * available.length)];
  lastVoiceVariant[petId] = variant;
  animalAudio?.pause?.();
  if (["rabbit", "hamster"].includes(petId)) {
    playSmallPetVoice(petId, energy);
    return;
  }
  const audio = new Audio(`assets/audio/animals/${petId}-${variant}.mp3`);
  animalAudio = audio;
  audio.volume = energy === "happy" ? .82 : energy === "alert" ? .72 : .64;
  audio.playbackRate = energy === "happy" ? 1.04 + Math.random() * .08 : .96 + Math.random() * .06;
  audio.play().catch(() => { toast("音效尚未启用，请再点击一次音符按钮。" ); });
}

function weatherEffectMarkup(weather) {
  if (["drizzle", "rain", "heavyRain", "thunderstorm"].includes(weather)) {
    const settings = {
      drizzle: { drops: 22, ripples: 7, length: 13, speed: 1.18, width: 1 },
      rain: { drops: 44, ripples: 14, length: 18, speed: .72, width: 1 },
      heavyRain: { drops: 72, ripples: 24, length: 25, speed: .5, width: 2 },
      thunderstorm: { drops: 84, ripples: 28, length: 29, speed: .43, width: 2 }
    }[weather];
    const drops = Array.from({ length: settings.drops }, (_, index) => {
      const x = (index * 37 + 7) % 101;
      const length = settings.length + index % 5 * 5;
      const opacity = (.3 + index % 6 * .08).toFixed(2);
      const duration = (settings.speed + index % 7 * .055).toFixed(2);
      const delay = (-index * .083).toFixed(2);
      return `<i class="rain-drop" style="--x:${x}%;--length:${length}px;--drop-width:${settings.width}px;--opacity:${opacity};--duration:${duration}s;--delay:${delay}s"></i>`;
    }).join("");
    const ripples = Array.from({ length: settings.ripples }, (_, index) => {
      const x = (index * 29 + 11) % 96 + 2;
      const bottom = 3 + index % 6 * 6;
      const size = 24 + index % 5 * 9;
      const duration = (1.55 + index % 4 * .24).toFixed(2);
      const delay = (-index * .37).toFixed(2);
      return `<i class="rain-ripple" style="--x:${x}%;--bottom:${bottom}%;--size:${size}px;--duration:${duration}s;--delay:${delay}s"></i>`;
    }).join("");
    const lightning = weather === "thunderstorm" ? `<i class="lightning-flash flash-a"></i><i class="lightning-flash flash-b"></i>` : "";
    return drops + ripples + lightning;
  }
  if (weather === "fog") return Array.from({ length: 5 }, (_, index) => `<i class="fog-bank" style="--y:${12 + index * 17}%;--height:${12 + index % 3 * 4}%;--opacity:${(.24 + index * .07).toFixed(2)};--duration:${13 + index * 3}s;--delay:${-index * 4}s"></i>`).join("");
  if (["cloudy", "partlyCloudy"].includes(weather)) {
    const count = weather === "partlyCloudy" ? 3 : 5;
    return Array.from({ length: count }, (_, index) => `<i class="cloud-shadow" style="--y:${8 + index * 19}%;--width:${45 + index % 3 * 13}%;--opacity:${(weather === "partlyCloudy" ? .16 + index % 2 * .05 : .22 + index % 3 * .08).toFixed(2)};--duration:${17 + index * 4}s;--delay:${-index * 5}s"></i>`).join("");
  }
  if (weather === "wind") {
    const colors = ["#769357", "#ba8b43", "#8a6e45", "#60804d"];
    return Array.from({ length: 16 }, (_, index) => `<i class="wind-leaf" style="--y:${7 + index % 8 * 10}%;--size:${8 + index % 4 * 3}px;--leaf-color:${colors[index % colors.length]};--rotation:${index * 31}deg;--duration:${4.8 + index % 5 * .7}s;--delay:${-index * .52}s"></i>`).join("");
  }
  if (weather === "coldSnap") return Array.from({ length: 5 }, (_, index) => `<i class="cold-haze" style="--y:${10 + index * 18}%;--duration:${15 + index * 2}s;--delay:${-index * 3}s"></i>`).join("");
  return "";
}

function shelteredHomeWeatherMarkup(weather) {
  if (!HOME_SHELTER_WEATHER.has(weather)) return "";
  const count = weather === "drizzle" ? 10 : weather === "rain" ? 16 : 22;
  const drops = Array.from({ length: count }, (_, index) => {
    const x = 3 + (index * 17 + 5) % 31;
    const duration = (weather === "thunderstorm" ? .62 : .9) + index % 4 * .09;
    return `<i class="indoor-rain" style="--x:${x}%;--duration:${duration.toFixed(2)}s;--delay:${(-index * .12).toFixed(2)}s"></i>`;
  }).join("");
  const flash = weather === "thunderstorm" ? `<i class="indoor-lightning"></i>` : "";
  return drops + flash;
}

function weatherPreviewMarkup(weather) {
  if (weather === "clear") return `<i class="preview-sun"></i>`;
  if (["cloudy", "partlyCloudy"].includes(weather)) {
    const count = weather === "partlyCloudy" ? 3 : 5;
    return Array.from({ length: count }, (_, index) => `<i class="preview-cloud" style="--x:${12 + index * 18}%;--y:${13 + index % 3 * 19}%;--size:${120 + index % 3 * 54}px"></i>`).join("");
  }
  if (["drizzle", "rain", "heavyRain", "thunderstorm"].includes(weather)) {
    const count = { drizzle: 14, rain: 24, heavyRain: 42, thunderstorm: 54 }[weather];
    const rippleCount = { drizzle: 4, rain: 6, heavyRain: 10, thunderstorm: 12 }[weather];
    const rain = Array.from({ length: count }, (_, index) => `<i class="preview-rain" style="--x:${3 + index * (94 / count)}%;--length:${30 + index % 4 * 10}px"></i>`).join("");
    const ripples = Array.from({ length: rippleCount }, (_, index) => `<i class="preview-ripple" style="--x:${8 + index * (84 / rippleCount)}%;--y:${8 + index % 2 * 10}%;--size:${36 + index % 3 * 14}px"></i>`).join("");
    const lightning = weather === "thunderstorm" ? `<i class="preview-lightning"></i>` : "";
    return rain + ripples + lightning;
  }
  if (weather === "fog") return Array.from({ length: 4 }, (_, index) => `<i class="preview-fog" style="--y:${14 + index * 20}%"></i>`).join("");
  if (weather === "wind") {
    const colors = ["#789456", "#bc8d46", "#65824e"];
    return Array.from({ length: 12 }, (_, index) => `<i class="preview-leaf" style="--y:${8 + index % 7 * 11}%;--size:${9 + index % 4 * 4}px;--leaf-color:${colors[index % colors.length]}"></i>`).join("");
  }
  if (weather === "coldSnap") return Array.from({ length: 4 }, (_, index) => `<i class="preview-fog preview-cold" style="--y:${14 + index * 20}%"></i>`).join("");
  return "";
}

function playWeatherTransition(fromId, toId) {
  const fromWeather = WEATHER[fromId] || WEATHER.clear;
  const toWeather = WEATHER[toId] || WEATHER.clear;
  weatherTransitionTimeline?.kill?.();
  clearTimeout(weatherTransitionTimeout);
  els.weatherTransition.hidden = false;
  els.weatherTransition.style.setProperty("--weather-from", fromWeather.color);
  els.weatherTransition.style.setProperty("--weather-to", toWeather.color);
  els.weatherTransition.dataset.weather = toId;
  els.weatherTransition.setAttribute("aria-label", `次日天气从${fromWeather.label}转为${toWeather.label}。${toWeather.note}`);
  els.weatherFromLabel.textContent = fromWeather.label;
  els.weatherToLabel.textContent = toWeather.label;
  els.weatherTransitionNote.textContent = `${toWeather.note}。${toWeather.impact}`;
  els.weatherTransitionScene.innerHTML = weatherPreviewMarkup(toId);
  if (!window.gsap || reducedMotion()) {
    weatherTransitionTimeout = setTimeout(() => { els.weatherTransition.hidden = true; els.weatherTransitionScene.innerHTML = ""; weatherTransitionTimeout = null; }, 420);
    return;
  }
  const transition = els.weatherTransition;
  const finish = () => {
    transition.hidden = true;
    els.weatherTransitionScene.innerHTML = "";
    gsap.set(transition, { clearProps: "clipPath,opacity,visibility" });
  };
  gsap.set(transition, { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
  weatherTransitionTimeline = gsap.timeline({ onComplete: finish, defaults: { ease: "power3.out" } })
    .to(transition, { clipPath: "inset(0 0% 0 0)", duration: .48 }, 0)
    .fromTo(transition.querySelector(".weather-transition-panel"), { y: 16, yPercent: -50, autoAlpha: 0 }, { y: 0, yPercent: -50, autoAlpha: 1, duration: .42 }, .14)
    .fromTo(transition.querySelector(".weather-transition-panel i"), { scaleX: 0 }, { scaleX: 1, duration: .42 }, .32);
  if (toId === "clear") weatherTransitionTimeline.fromTo(".preview-sun", { scale: .62, autoAlpha: .2 }, { scale: 1, autoAlpha: .95, duration: 1.2, ease: "sine.out" }, .08);
  if (["cloudy", "partlyCloudy"].includes(toId)) weatherTransitionTimeline.fromTo(".preview-cloud", { x: -120, autoAlpha: 0 }, { x: 100, autoAlpha: .7, duration: 1.7, stagger: .1, ease: "power1.inOut" }, .02);
  if (["drizzle", "rain", "heavyRain", "thunderstorm"].includes(toId)) {
    weatherTransitionTimeline.fromTo(".preview-rain", { y: -80, rotation: 10, autoAlpha: 0 }, { y: () => window.innerHeight * .9, rotation: 10, autoAlpha: .9, duration: 1.15, stagger: .025, ease: "none" }, .04);
    weatherTransitionTimeline.fromTo(".preview-ripple", { scale: .18, autoAlpha: 0 }, { scale: 1.45, autoAlpha: .72, duration: 1, stagger: .12, ease: "power1.out" }, .55).to(".preview-ripple", { autoAlpha: 0, duration: .32 }, 1.28);
  }
  if (toId === "fog") weatherTransitionTimeline.fromTo(".preview-fog", { xPercent: -15, autoAlpha: 0 }, { xPercent: 185, autoAlpha: .72, duration: 1.85, stagger: .14, ease: "sine.inOut" }, .02);
  if (toId === "wind") weatherTransitionTimeline.fromTo(".preview-leaf", { x: -60, y: 0, rotation: 0, autoAlpha: 0 }, { x: () => window.innerWidth + 120, y: (_, element) => 35 + Number.parseFloat(element.style.getPropertyValue("--y")) * .65, rotation: 380, autoAlpha: .85, duration: 1.7, stagger: .055, ease: "power1.inOut" }, .02);
  if (toId === "coldSnap") weatherTransitionTimeline.fromTo(".preview-cold", { xPercent: -15, autoAlpha: 0 }, { xPercent: 185, autoAlpha: .76, duration: 1.85, stagger: .14, ease: "sine.inOut" }, .02);
  weatherTransitionTimeline.to(transition, { autoAlpha: 0, duration: .38, ease: "power2.in" }, 2.05);
}

function renderWeatherEffects() {
  $$('[data-weather-fx]').forEach(layer => {
    const sheltered = layer.closest(".location-view")?.dataset.sheltered === "true";
    const signature = `${state.weather}:${sheltered ? "sheltered" : "open"}`;
    if (layer.dataset.weather === signature) return;
    layer.dataset.weather = signature;
    layer.className = `weather-fx weather-${state.weather}`;
    layer.innerHTML = sheltered ? shelteredHomeWeatherMarkup(state.weather) : weatherEffectMarkup(state.weather);
  });
}

function renderWeather() {
  const display = $("#weatherDisplay");
  const weather = WEATHER[state.weather] || WEATHER.clear;
  display.querySelector("b").textContent = weather.label;
  display.querySelector("small").textContent = weather.note;
  display.querySelector("span").style.background = weather.color;
  document.body.dataset.weather = state.weather;
  renderWeatherEffects();
  updateWeatherAmbience();
  const eventCount = activeEvents().length;
  const pet = petById(state.activePetId);
  $("#worldSummary").textContent = eventCount ? `家园 Lv.${sanctuaryLevel()} · 山谷有 ${eventCount} 件事 · ${pet.name}今日生活 ${routineDoneCount(pet.id)}/5` : `家园 Lv.${sanctuaryLevel()} · ${pet.name}今日生活 ${routineDoneCount(pet.id)}/5`;
}

function renderFirstDayHook() {
  if (!els.firstDayHook) return;
  const show = state.day === 1 && !state.completed.includes("rescue-rabbit") && !hasPetOrCandidate("rabbit");
  els.firstDayHook.hidden = !show;
}

function canContinueSave() {
  return state.day > 1 || state.completed.length > 0 || state.careStreak > 0 || state.ownedPetIds.length > 1;
}

function showStartMenu() {
  if (!els.startMenu) return;
  const resume = canContinueSave();
  els.startBegin.hidden = resume;
  els.startContinue.hidden = !resume;
  els.startReset.hidden = !resume;
  els.startMenu.hidden = false;
}

function hideStartMenu() {
  if (els.startMenu) els.startMenu.hidden = true;
}

function maybeOpenOnboarding() {
  const params = new URLSearchParams(location.search);
  if (params.has("smoke")) return;
  if (els.startMenu && !els.startMenu.hidden) return;
  if ((params.has("guide") || !localStorage.getItem("valleySanctuaryOnboardingV2")) && els.onboardingTour.hidden) openOnboarding();
}

function beginPlay() {
  hideStartMenu();
  maybeOpenOnboarding();
}

function startNewSanctuary() {
  if (typeof cancelMiniGame === "function") cancelMiniGame();
  closeTutorialPreviewDialogs();
  localStorage.removeItem("valleySanctuaryOnboardingV2");
  state = createDefaultState();
  showWorld();
  renderAll();
  showPet(state.activePetId, "idle");
  saveState();
  hideStartMenu();
  openOnboarding();
}

function renderAll() { renderResources(); renderMapTheme(); renderRoster(); renderMap(); renderWeather(); renderSleepState(); renderHomeFurnishings(); renderExplorationScenes(); renderFirstDayHook(); }

function preloadLocationArt() {
  Object.values(LOCATIONS).forEach(location => { const image = new Image(); image.decoding = "async"; image.src = location.image; });
  MAP_THEMES.forEach(theme => {
    [theme.image, theme.mobileImage].forEach(source => { const image = new Image(); image.decoding = "async"; image.src = source; });
  });
}

function installMotionFeedback() {
  document.addEventListener("pointerdown", event => {
    const button = event.target.closest?.("button:not(:disabled)");
    if (!button || !window.gsap || reducedMotion() || button.matches(".map-hotspot, .calendar-day, .pet-chip, .drag-item, .placed-furniture")) return;
    gsap.killTweensOf(button);
    gsap.timeline()
      .to(button, { scale: .93, duration: .08, ease: "power2.out" })
      .to(button, { scale: 1, duration: .22, ease: "power3.out", clearProps: "transform" });
  }, { passive: true });
}

$("#backMapButton").addEventListener("click", showWorld);
$("#brandButton").addEventListener("click", showWorld);
$("#goHomeButton").addEventListener("click", () => enterLocation("home"));
els.dockToggle.addEventListener("click", () => {
  setDockExpanded(!document.body.classList.contains("dock-expanded"));
});
window.addEventListener("resize", () => { renderRoster(); renderHomeFurnishings(); renderSleepState(); renderExplorationScenes(); positionTutorial(); });
document.addEventListener("scroll", positionTutorial, true);
$("#advanceButton").addEventListener("click", () => playTimeAdvanceTransition(timeAdvanceAmount()));
els.mapPanPrev.addEventListener("click", () => panMapBy(-1));
els.mapPanNext.addEventListener("click", () => panMapBy(1));
els.mapThemeButton.addEventListener("click", cycleMapTheme);
installMapPanInteraction();
els.inventory.addEventListener("click", () => { renderInventory(); els.inventoryDialog.showModal(); animateDialogOpen(els.inventoryDialog); });
els.help.addEventListener("click", () => { renderJournal(); els.helpDialog.showModal(); animateDialogOpen(els.helpDialog); });
els.calendar.addEventListener("click", openCalendar);
els.calendarPrev.addEventListener("click", () => {
  if (calendarViewMonth <= 1) return;
  calendarViewMonth -= 1;
  calendarSelectedDay = calendarMonthStart(calendarViewMonth);
  renderCalendar({ monthDirection: -1 });
});
els.calendarNext.addEventListener("click", () => {
  calendarViewMonth += 1;
  calendarSelectedDay = calendarMonthStart(calendarViewMonth);
  renderCalendar({ monthDirection: 1 });
});
els.calendarToday.addEventListener("click", () => {
  const direction = calendarMonthForDay(state.day) >= calendarViewMonth ? 1 : -1;
  calendarViewMonth = calendarMonthForDay(state.day);
  calendarSelectedDay = state.day;
  renderCalendar({ monthDirection: direction });
});
els.onboardingPrev.addEventListener("click", () => {
  if (onboardingStep <= 0) return;
  onboardingStep -= 1;
  renderOnboardingStep(-1);
});
els.onboardingNext.addEventListener("click", () => {
  if (onboardingStep >= ONBOARDING_STEPS.length - 1) { finishOnboarding(); return; }
  onboardingStep += 1;
  renderOnboardingStep(1);
});
els.onboardingSkip.addEventListener("click", () => finishOnboarding("已跳过引导，可以随时在经营日志中重新查看。"));
els.onboardingReplay.addEventListener("click", () => { els.helpDialog.close(); setTimeout(openOnboarding, 60); });
els.sound.addEventListener("click", () => { state.muted = !state.muted; if (state.muted) { animalAudio?.pause?.(); stopWeatherAmbience(); stopSnoreLoop(); } renderResources(); saveState(); if (!state.muted) { ensureAudioContext(); playFoley("success"); playPetVoice(state.activePetId, "soft"); startSnoreLoop(); } });
$("#nextDayButton").addEventListener("click", nextDay);
els.shareDay?.addEventListener("click", shareDayPostcard);
els.startBegin?.addEventListener("click", beginPlay);
els.startContinue?.addEventListener("click", beginPlay);
els.startReset?.addEventListener("click", startNewSanctuary);
document.addEventListener("pointerdown", unlockAudio, { once: true, capture: true });
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !els.onboardingTour.hidden) { finishOnboarding("已关闭引导，可以在经营日志中重新查看。"); return; }
  if (event.key === "Escape" && state.miniGameActive) cancelMiniGame();
  if (event.key.toLowerCase() === "m" && !event.metaKey && !event.ctrlKey) showWorld();
});
document.addEventListener("visibilitychange", () => {
  worldAmbientTimeline?.paused?.(document.hidden || state.view !== "world");
  locationAmbientTimeline?.paused?.(document.hidden || state.view !== "location");
  if (document.hidden) saveState();
});
window.addEventListener("pagehide", saveState);
window.matchMedia?.("(prefers-reduced-motion: reduce)").addEventListener?.("change", event => {
  if (event.matches) {
    worldAmbientTimeline = stopAmbientMotion(worldAmbientTimeline);
    locationAmbientTimeline = stopAmbientMotion(locationAmbientTimeline);
    calendarOpenTimeline?.kill?.();
    weatherTransitionTimeline?.kill?.();
  } else if (state.view === "world") startWorldAmbientMotion();
  else startLocationAmbientMotion();
});

renderAll();
installMotionFeedback();
showPet(state.activePetId, "idle");
if (state.view === "location") enterLocation(state.location); else showWorld();

const timeLoop = setInterval(() => {
  if (!document.hidden && !state.miniGameActive && !els.dayDialog.open && !els.calendarDialog.open && els.startMenu.hidden) advanceTime(15);
}, 24000);

window.addEventListener("beforeunload", () => { clearInterval(timeLoop); clearTimeout(weatherTransitionTimeout); clearTimeout(mapSceneTransitionTimer); clearTimeout(miniGameTimer); clearMiniTimers(); clearTimeout(completionFlourishTimer); clearTimeAdvanceSound(); animalAudio?.pause?.(); stopSnoreLoop(); stopWeatherAmbience(); stopAmbientMotion(worldAmbientTimeline); stopAmbientMotion(locationAmbientTimeline); calendarOpenTimeline?.kill?.(); timeAdvanceTimeline?.kill?.(); weatherTransitionTimeline?.kill?.(); completionFlourishTimeline?.kill?.(); saveState(); });
setTimeout(() => {
  const params = new URLSearchParams(location.search);
  const smokeRun = params.has("smoke");
  if (!smokeRun) showStartMenu();
  maybeOpenOnboarding();
}, 500);

(window.requestIdleCallback || (callback => setTimeout(callback, 900)))(preloadLocationArt);
