# 山谷动物家园：背景音乐生成提示词

## 1. 统一生成规格

所有曲目都应遵循以下要求。建议先把“统一母提示词”与具体场景提示词合并，再提交给音乐生成模型。

### 统一母提示词

```text
Instrumental background music for a premium cozy animal sanctuary management game. Warm, lighthearted, optimistic and gently playful, with natural acoustic instruments, refined orchestration, clear melodic identity and a calm sense of everyday life. The music must support long gameplay sessions without becoming repetitive or distracting. Seamless loop, clean bar-aligned ending, no fade-out, no dramatic intro, no vocals, no spoken words, no animal sounds, no weather sound effects, no cinematic trailer impacts. Avoid childish nursery music, cheap mobile-game jingles, excessive glockenspiel, comedy pizzicato, ukulele cliches, EDM drops, heavy drums, sad tension and overly busy melodies. Organic, polished, intimate and believable.
```

### 输出参数

- 源文件：优先生成 `WAV`，立体声，`48 kHz / 24-bit`。
- 游戏文件：转换为 `MP3 160–192 kbps` 或 `OGG Vorbis q6`。
- 循环长度：常驻场景 `90–150 秒`；小游戏 `45–75 秒`；过场 `8–16 秒`。
- 速度：常驻场景以 `78–112 BPM` 为主。
- 响度：常驻音乐约 `-18 LUFS`，最大真峰值不高于 `-1 dBTP`。
- 循环要求：第一拍和最后一拍在和声、混响尾音与节奏上自然衔接。
- 音乐中不要包含雨声、雷声、风声、水声、鸟鸣、猫叫或犬吠，这些由游戏音效系统单独播放。

## 2. 世界与公共界面

### 山谷世界地图

目标路径：`assets/audio/music/world-day.mp3`

```text
Bright daytime overworld music for a hand-painted green valley where the player manages an animal sanctuary and travels between a home, rescue station, market, clinic, meadow, lake, forest, training field and highland lookout. 96 BPM, warm G major, fingerpicked acoustic guitar, soft upright piano, gentle clarinet, light brushed percussion, subtle strings and restrained hand percussion. The melody should suggest flowing streams, moving clouds and a living countryside without imitating sound effects. Cheerful, spacious and exploratory, with small melodic changes every eight bars. Premium cozy game soundtrack, seamless 120-second loop, no intro sting and no fade-out.
```

### 经营日历

目标路径：`assets/audio/music/calendar.mp3`

```text
Gentle planning music for opening a physical management calendar in a cozy animal sanctuary game. 82 BPM, light D major, felt piano, nylon guitar harmonics, soft bass clarinet and delicate brushed frame drum. Organized and reassuring, like calmly reviewing tomorrow's work at a wooden desk. Keep the melody sparse so reading remains easy. Refined rather than whimsical, seamless 90-second loop, no page-turn sound, no ticking clock, no vocals and no fade-out.
```

### 背包与经营日志

目标路径：`assets/audio/music/management.mp3`

```text
Quiet management-interface music for checking supplies, animal growth, daily tasks and sanctuary records. 88 BPM, warm C major, muted upright piano, marimba used very sparingly, soft acoustic bass and brushed percussion. Clear, tidy, optimistic and focused, with short repeating motifs that never sound urgent. Premium operational game ambience, seamless 90-second loop, no notification sounds, no vocals and no fade-out.
```

### 日结与新一天

目标路径：`assets/audio/music/day-complete.mp3`

```text
Short end-of-day completion cue for a cozy animal sanctuary management game. Warm acoustic guitar, felt piano, soft strings and one restrained brass-like harmonic lift. Begin calmly, rise into a satisfying but modest resolution, then leave a clean final tail. Hopeful and grateful, never triumphant or loud. 12 seconds, G major, no vocals, no percussion impact, no comedy sound and no animal sounds.
```

## 3. 九个地图场景

### 动物家园

目标路径：`assets/audio/music/home.mp3`

```text
Cozy indoor-and-garden music for an animal sanctuary home where pets eat, rest, play, receive grooming and interact with furniture. 84 BPM, warm C major, felt piano, fingerpicked nylon guitar, mellow cello, soft clarinet and barely audible brushed percussion. The mood is safe, affectionate and lived-in, with a gentle breathing rhythm and a simple melody that feels familiar without becoming sentimental. Premium realistic-cute game soundtrack, seamless 120-second loop, no lullaby bells, no animal sounds and no fade-out.
```

### 山谷救助站

目标路径：`assets/audio/music/rescue.mp3`

```text
Compassionate but uplifting background music for a small countryside animal rescue station. 86 BPM, F major, warm upright piano, acoustic guitar, soft viola, bassoon and restrained brushed drums. Convey careful work, patience and the hopeful beginning of trust, never sadness or emergency tension. The melody should feel humane, steady and quietly optimistic. Seamless 120-second loop, no hospital beeps, no crying sounds, no vocals and no fade-out.
```

### 溪桥集市

目标路径：`assets/audio/music/market.mp3`

```text
Friendly rural market music for buying animal supplies, furniture and new companions beside a small stream bridge. 108 BPM, bright D major, acoustic guitar, mandolin used subtly, upright bass, hand drum, accordion in a restrained supporting role and light clarinet phrases. Sociable, lively and orderly rather than crowded or comedic. The groove should encourage browsing and small business decisions. Premium cozy management-game soundtrack, seamless 120-second loop, no merchant voices, no coin sounds and no fade-out.
```

### 山谷诊所

目标路径：`assets/audio/music/clinic.mp3`

```text
Clean and reassuring music for a friendly rural veterinary clinic in an animal care game. 80 BPM, gentle E-flat major, felt piano, soft vibraphone used sparingly, warm clarinet, cello and subtle brushed percussion. Calm, precise and comforting, with no anxiety, sadness or sterile science-fiction feeling. Keep the arrangement uncluttered for health checks and care decisions. Seamless 120-second loop, no monitor beeps, no heartbeat effects, no vocals and no fade-out.
```

### 风铃草甸

目标路径：`assets/audio/music/meadow.mp3`

```text
Open-air meadow music for walking, scent exploration, rabbit carrot harvesting and short bird recall practice. 102 BPM, bright A major, fingerpicked steel-string guitar, light fiddle, wooden flute used gently, upright bass and soft hand percussion. Breezy, sunny and playful with long melodic phrases and enough open space to suggest grass moving in the wind. Natural and polished, not folk-comedy or childish. Seamless 120-second loop, no wind, birdsong or animal sounds and no fade-out.
```

### 芦湾湖畔

目标路径：`assets/audio/music/lakeside.mp3`

```text
Peaceful lakeside boardwalk music for wetland observation, cleanup and quiet fishing with a cat. 78 BPM, calm G major with suspended chords, nylon guitar, felt piano, warm bass clarinet, soft cello harmonics and minimal brushed percussion. Reflective but still cheerful, with gently repeating wave-like phrasing and patient pauses suited to waiting for a fishing float. Seamless 135-second loop, no water sounds, no bird calls, no fishing sound effects and no fade-out.
```

### 杉木森林

目标路径：`assets/audio/music/forest.mp3`

```text
Warm exploratory forest music for scent tracking, trail patrol and caring for a rescued young fox. 90 BPM, earthy E major, acoustic guitar, low wooden flute, viola, marimba used as a quiet texture and soft frame drum. Curious and sheltered with dappled-light harmonies, never mysterious, threatening or dark. Use a grounded melody that rewards careful observation. Premium nature-game soundtrack, seamless 125-second loop, no wildlife calls, branch sounds or wind effects and no fade-out.
```

### 伙伴训练场

目标路径：`assets/audio/music/training.mp3`

```text
Energetic but gentle training-field music for animal recall, obstacle practice and strength-timed throwing games. 112 BPM, bright B-flat major, rhythmic acoustic guitar, pizzicato strings used musically rather than comedically, upright bass, brushed snare and light hand percussion. Encouraging, focused and playful, with a clear pulse for timing actions but no competitive pressure. Seamless 100-second loop, no whistles, no barking, no sports-stadium sound and no fade-out.
```

### 云脊瞭望台

目标路径：`assets/audio/music/highlands.mp3`

```text
Spacious highland lookout music for observing the valley, migration routes and distant weather. 88 BPM, luminous D major, open acoustic guitar voicings, warm French horn used softly, viola, low piano and restrained frame drum. Convey altitude, clean air and a broad view while remaining cozy and optimistic. Expansive but never epic or cinematic. Seamless 130-second loop, no wind sound effects, no thunder, no dramatic crescendos and no fade-out.
```

## 4. 时间与休息

### 家园夜间

目标路径：`assets/audio/music/home-night.mp3`

```text
Quiet evening music inside a safe animal sanctuary home after daily work is complete. 72 BPM, soft G major, felt piano, nylon guitar, warm cello and very light clarinet. Cozy lamplight, tidy bedding and calm companionship, with slower harmonic movement than the daytime home track. Peaceful and content rather than sleepy-sad. Seamless 120-second loop, no crickets, no snoring, no music-box tone and no fade-out.
```

### 动物睡眠

目标路径：`assets/audio/music/sleep.mp3`

```text
Minimal sleep ambience for pets resting safely in their beds. 58 BPM, very soft C major, felt piano, muted nylon guitar harmonics and a low sustained cello texture. Slow breathing-like phrasing, almost no percussion, extremely gentle dynamics and generous silence. Warm and secure, not melancholy, magical or dreamlike. Seamless 150-second loop, no music box, no bells, no snoring, no animal sounds and no fade-out.
```

## 5. 天气适配层

天气音乐建议作为低音量叠加层使用，不替换场景主题。生成时保持旋律极少，避免与地点音乐争抢。

### 小雨与中雨层

目标路径：`assets/audio/music/weather-rain-layer.mp3`

```text
Subtle harmonic overlay for light and moderate rain in a cozy animal sanctuary game. 76 BPM, neutral suspended harmony compatible with G major, D major and C major, soft felt-piano droplets, warm viola pads and quiet brushed texture. Cozy shelter and slower movement, still optimistic and never sad. Very sparse melody so it can layer under existing location music. Seamless 90-second loop, no actual rain sounds, no thunder, no vocals and no fade-out.
```

### 大雨层

目标路径：`assets/audio/music/weather-heavy-rain-layer.mp3`

```text
Low-volume adaptive music layer for a day of heavy rain when outdoor animal activities are paused. 72 BPM, warm suspended chords, muted piano, cello, bass clarinet and soft brushed pulse. Convey staying safely indoors, practical work and patient companionship. Slightly more enclosed than the normal rain layer but still reassuring and light. Sparse arrangement for layering, seamless 90-second loop, no rain recording, no thunder, no danger tension and no fade-out.
```

### 雷暴安抚层

目标路径：`assets/audio/music/weather-thunderstorm-layer.mp3`

```text
Gentle shelter music layer for comforting sensitive pets during a thunderstorm. 68 BPM, warm low piano, soft cello, bass clarinet and quiet sustained strings, with stable consonant harmony and a reassuring recurring three-note motif. Protective, calm and caring, never frightening, ominous or tragic. Minimal melodic density for layering beneath home, rescue, market or clinic music. Seamless 90-second loop, no thunder sound effects, no low cinematic booms and no fade-out.
```

### 寒潮层

目标路径：`assets/audio/music/weather-cold-layer.mp3`

```text
Light winter-cold adaptive layer for an animal sanctuary during a sudden temperature drop. 74 BPM, clear piano harmonics, warm viola, soft clarinet and a restrained acoustic bass. Suggest crisp air outside and warm bedding indoors without sounding like a holiday song. Reassuring, practical and gently bright. Sparse seamless 90-second loop, no wind sounds, no sleigh bells, no Christmas melody and no fade-out.
```

## 6. 主要小游戏

### 钓鱼

目标路径：`assets/audio/music/minigame-fishing.mp3`

```text
Patient but playful fishing mini-game music beside a quiet lake with a curious cat. 92 BPM, light G major, muted acoustic guitar, pizzicato cello, soft clarinet and brushed percussion. Alternate between calm waiting phrases and a slightly more active rhythmic answer without creating stress. Clear pulse, restrained melody, seamless 60-second loop, no water, reel, fish or cat sounds and no fade-out.
```

### 拔萝卜

目标路径：`assets/audio/music/minigame-carrot.mp3`

```text
Cheerful rhythm mini-game music for alternating left and right inputs while helping a rabbit pull carrots from a garden. 110 BPM, bright F major, acoustic guitar, upright bass, hand claps replaced by soft wooden percussion, light fiddle and restrained piano. A clear alternating two-beat pulse, encouraging and playful without comedy or frantic speed. Seamless 60-second loop, no soil sounds, no squeaks and no fade-out.
```

### 犬类投掷召回

目标路径：`assets/audio/music/minigame-fetch.mp3`

```text
Upbeat timing mini-game music for throwing a dog-specific toy at the right strength and watching the dog retrieve it. 114 BPM, bright D major, rhythmic acoustic guitar, upright bass, brushed snare, short clarinet phrases and light strings. Clear build-and-release rhythm for the moving strength meter, energetic but friendly and never competitive. Seamless 60-second loop, no barking, footsteps, throwing impacts or sports whistles and no fade-out.
```

### 鸟类低空召回

目标路径：`assets/audio/music/minigame-bird-flight.mp3`

```text
Light and airy recall-training music for a budgerigar or cockatiel hopping, stretching its wings and making short safe flights in a meadow. 106 BPM, bright A major, nylon guitar, soft flute used as an instrumental color rather than birdsong, pizzicato strings, upright bass and delicate brushed percussion. Agile, graceful and affectionate, with ascending phrases that remain calm. Seamless 60-second loop, no bird calls, whistles, wing sounds or toy bells and no fade-out.
```

### 喂食与护理

目标路径：`assets/audio/music/minigame-care.mp3`

```text
Warm hands-on animal care mini-game music for feeding, brushing, bathing and gentle petting. 88 BPM, C major, felt piano, nylon guitar, mellow clarinet and soft brushed percussion. Close, patient and responsive, with a simple affectionate motif and understated rhythmic movement. Premium and natural, not babyish. Seamless 60-second loop, no chewing, water, brushing, heartbeat or animal sounds and no fade-out.
```

### 搜索、巡护与清理

目标路径：`assets/audio/music/minigame-inspection.mp3`

```text
Focused exploration mini-game music for scent tracking, listening, scanning, finding supplies and continuously clearing environmental debris. 98 BPM, warm E major, muted acoustic guitar, marimba used sparingly, bass clarinet, viola and soft frame drum. Curious and methodical with a clear sense of progress, but no mystery tension or detective parody. Seamless 65-second loop, no magnifier sounds, rustling, footsteps or notification pings and no fade-out.
```

## 7. 收养与成长反馈

### 收养成功

目标路径：`assets/audio/music/adoption-cue.mp3`

```text
Short heartfelt adoption-success cue for welcoming a rescued animal into a countryside sanctuary. Felt piano, warm acoustic guitar, clarinet and soft strings in G major. Begin intimate, open into a gentle hopeful resolution and finish cleanly. Emotional but restrained, sincere rather than sentimental or triumphant. 10 seconds, no vocals, no animal sounds, no applause and no oversized cinematic swell.
```

### 成长升级

目标路径：`assets/audio/music/growth-cue.mp3`

```text
Short polished progression cue for an animal gaining a growth level or the sanctuary unlocking a new location. Bright piano, acoustic guitar harmonics, warm clarinet and a restrained string lift. Clear positive recognition without sounding like an arcade reward. 7 seconds, D major, no coin sounds, no fanfare brass, no vocals and no comedy flourish.
```

## 8. 文件清单

```text
assets/audio/music/world-day.mp3
assets/audio/music/calendar.mp3
assets/audio/music/management.mp3
assets/audio/music/day-complete.mp3
assets/audio/music/home.mp3
assets/audio/music/rescue.mp3
assets/audio/music/market.mp3
assets/audio/music/clinic.mp3
assets/audio/music/meadow.mp3
assets/audio/music/lakeside.mp3
assets/audio/music/forest.mp3
assets/audio/music/training.mp3
assets/audio/music/highlands.mp3
assets/audio/music/home-night.mp3
assets/audio/music/sleep.mp3
assets/audio/music/weather-rain-layer.mp3
assets/audio/music/weather-heavy-rain-layer.mp3
assets/audio/music/weather-thunderstorm-layer.mp3
assets/audio/music/weather-cold-layer.mp3
assets/audio/music/minigame-fishing.mp3
assets/audio/music/minigame-carrot.mp3
assets/audio/music/minigame-fetch.mp3
assets/audio/music/minigame-bird-flight.mp3
assets/audio/music/minigame-care.mp3
assets/audio/music/minigame-inspection.mp3
assets/audio/music/adoption-cue.mp3
assets/audio/music/growth-cue.mp3
```

生成完成后，所有文件应使用上面的固定名称。天气层与地点音乐需要分别导出，不要把雨声、雷声或动物叫声混入音乐文件。
