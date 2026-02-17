const form = document.getElementById('growth-form');
const result = document.getElementById('result');

const summary = document.getElementById('summary');
const checklist = document.getElementById('checklist');
const titleIdeas = document.getElementById('title-ideas');
const hashtags = document.getElementById('hashtags');
const roadmap = document.getElementById('roadmap');

const growthScore = document.getElementById('growth-score');
const growthLevel = document.getElementById('growth-level');
const outputMix = document.getElementById('output-mix');
const primaryGoal = document.getElementById('primary-goal');

const getLevel = (score) => {
  if (score >= 85) return 'Xuất sắc';
  if (score >= 70) return 'Tốt';
  if (score >= 55) return 'Khá';
  return 'Cần tối ưu thêm';
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const channelName = document.getElementById('channelName').value.trim();
  const channelUrl = document.getElementById('channelUrl').value.trim();
  const niche = document.getElementById('niche').value.trim();
  const audience = document.getElementById('audience').value.trim();
  const frequency = Number(document.getElementById('frequency').value);
  const subscribers = Number(document.getElementById('subscribers').value);
  const avgViews = Number(document.getElementById('avgViews').value);
  const duration = Number(document.getElementById('duration').value);
  const targetViews = Number(document.getElementById('targetViews').value);
  const keywords = document
    .getElementById('keywords')
    .value.split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const monthlyVideos = frequency * 4;
  const shortsPerWeek = Math.max(2, Math.floor(frequency * 1.5));
  const monthlyShorts = shortsPerWeek * 4;

  const estimatedMonthlyViews = avgViews * monthlyVideos + Math.round(monthlyShorts * (avgViews * 0.28));
  const targetGap = targetViews - estimatedMonthlyViews;

  const scoreFromFrequency = Math.min(35, frequency * 7);
  const scoreFromDuration = duration >= 6 && duration <= 15 ? 20 : 12;
  const scoreFromKeywords = Math.min(20, keywords.length * 4);
  const scoreFromBaseline = avgViews >= 1000 ? 18 : avgViews >= 400 ? 12 : 8;
  const scoreBase = 15;
  const score = Math.min(
    100,
    scoreBase + scoreFromFrequency + scoreFromDuration + scoreFromKeywords + scoreFromBaseline,
  );

  growthScore.textContent = `${score}/100`;
  growthLevel.textContent = `Mức độ: ${getLevel(score)}`;
  outputMix.textContent = `${monthlyVideos} + ${monthlyShorts}`;

  primaryGoal.textContent = targetGap > 0 ? 'Mở rộng reach + retention' : 'Duy trì ổn định + nhân rộng';

  const durationAdvice =
    duration < 6
      ? 'Nên tăng lên 6-12 phút để cải thiện watch time.'
      : duration > 15
        ? 'Video hơi dài, nên tăng nhịp dựng để giữ retention.'
        : 'Thời lượng hợp lý, tập trung vào hook 15 giây đầu.';

  const gapText =
    targetGap > 0
      ? `Cần thêm khoảng <strong>${targetGap.toLocaleString('vi-VN')}</strong> view để chạm mục tiêu 30 ngày.`
      : `Bạn đang có khả năng vượt mục tiêu khoảng <strong>${Math.abs(targetGap).toLocaleString('vi-VN')}</strong> view nếu giữ đều hiệu suất.`;

  summary.innerHTML = `
    <p><strong>Kênh:</strong> ${channelName}${channelUrl ? ` • <a href="${channelUrl}" target="_blank" rel="noopener noreferrer">Xem kênh</a>` : ''}</p>
    <p><strong>Ngách:</strong> ${niche}</p>
    <p><strong>Audience:</strong> ${audience}</p>
    <p><strong>Hiện trạng:</strong> ${subscribers.toLocaleString('vi-VN')} subscribers • ${avgViews.toLocaleString('vi-VN')} view/video.</p>
    <p><strong>Dự báo:</strong> ~${estimatedMonthlyViews.toLocaleString('vi-VN')} view/tháng với lịch ${monthlyVideos} video dài + ${monthlyShorts} Shorts.</p>
    <p><strong>Mục tiêu 30 ngày:</strong> ${targetViews.toLocaleString('vi-VN')} view. ${gapText}</p>
    <p><strong>Nhận định:</strong> ${durationAdvice}</p>
  `;

  const roadmapItems = [
    `Tuần 1: Audit 10 video gần nhất của ${channelName}, chốt 3 format nội dung xoay quanh ${keywords[0] || niche}.`,
    `Tuần 2: Đăng ${frequency} video dài/tuần + test 2 thumbnail/video, theo dõi CTR sau 24h đầu.`,
    `Tuần 3: Cắt và phân phối ${shortsPerWeek} Shorts/tuần để kéo traffic ngược về video chính và playlist.`,
    'Tuần 4: Tổng kết dữ liệu, giữ mẫu tiêu đề/thumbnail hiệu quả nhất và chuẩn hóa quy trình sản xuất tháng sau.',
  ];
  roadmap.innerHTML = roadmapItems.map((item) => `<li>${item}</li>`).join('');

  const actionItems = [
    `Giữ lịch cố định ${frequency} video dài/tuần, cùng khung giờ để tăng returning viewers.`,
    `Đặt mục tiêu CTR thumbnail tối thiểu 5-7% cho ngách ${niche}; nếu thấp hơn thì thay thumbnail trong 48h.`,
    `Mỗi video phải có CTA rõ: xem video tiếp theo + ghim bình luận theo insight của tệp ${audience}.`,
    `Phân bổ ${shortsPerWeek} Shorts/tuần từ các đoạn retention cao để tăng phễu người xem mới.`,
    `Theo dõi tỷ lệ view/subscriber hiện tại (${subscribers > 0 ? ((avgViews / subscribers) * 100).toFixed(1) : '0'}%) để điều chỉnh format nội dung.`,
    `Review hằng tuần: so sánh view thực tế với mục tiêu ${targetViews.toLocaleString('vi-VN')} và cập nhật chủ đề thắng.`,
  ];
  checklist.innerHTML = actionItems.map((item) => `<li>${item}</li>`).join('');

  const firstKeyword = keywords[0] || niche;
  const secondKeyword = keywords[1] || 'tips';
  const titles = [
    `${channelName}: 30 ngày triển khai ${firstKeyword} và kết quả tăng view thực tế`,
    `7 lỗi khiến video ${firstKeyword} không lên đề xuất (cách sửa chi tiết)`,
    `${firstKeyword} + ${secondKeyword}: công thức tăng CTR thumbnail trong 10 phút`,
    `Case study kênh ${niche}: từ ${avgViews.toLocaleString('vi-VN')} lên ${Math.max(avgViews * 2, avgViews + 1000).toLocaleString('vi-VN')} view/video`,
  ];
  titleIdeas.innerHTML = titles.map((title) => `<li>${title}</li>`).join('');

  const hashtagList = keywords
    .slice(0, 8)
    .map((keyword) => `#${keyword.replace(/\s+/g, '')}`)
    .join(' ');
  hashtags.textContent = hashtagList || '#YouTubeGrowth #YouTubeSEO #OrganicViews';

  result.classList.remove('hidden');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
