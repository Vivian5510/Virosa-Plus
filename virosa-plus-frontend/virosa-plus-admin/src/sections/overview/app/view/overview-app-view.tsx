import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration, MotivationIllustration } from 'src/assets/illustrations';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const theme = useTheme();

  return (
    <DashboardContent maxWidth={false} disableGutters>
      {/* 顶部英雄区 */}
      <Box
        sx={{
          pt: { xs: 10, md: 20 },
          pb: { xs: 10, md: 15 },
          position: 'relative',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
            theme.palette.primary.dark,
            0.2
          )} 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h1" sx={{ mb: 3, fontSize: { xs: '2rem', md: '3.5rem' } }}>
                Virosa Blog
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {' '}
                  平台
                </Box>
              </Typography>

              <Typography variant="h4" sx={{ mb: 4, color: 'text.secondary', fontWeight: 400 }}>
                分享您的故事，连接全球读者
              </Typography>

              <Typography
                sx={{ color: 'text.secondary', mb: 5, maxWidth: 480, mx: { xs: 'auto', md: 0 } }}
              >
                Virosa Blog
                是一个现代化博客平台，为创作者提供强大的工具和优雅的设计，让您的内容更加出众。
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Iconify icon="eva:flash-fill" />}
                >
                  开始创作
                </Button>

                <Button variant="outlined" size="large" startIcon={<Iconify icon="eva:eye-fill" />}>
                  查看演示
                </Button>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 460,
                  mt: { xs: 5, md: 0 },
                }}
              >
                <SeoIllustration />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 核心特性 */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 15 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            为什么选择 Virosa Blog?
          </Typography>

          <Typography sx={{ color: 'text.secondary', maxWidth: 680, mx: 'auto' }}>
            我们提供专业的博客工具，让您专注于创作精彩内容，而不必担心技术细节
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {[
            {
              icon: 'fluent:design-ideas-24-filled',
              title: '优雅设计',
              description: '精心设计的主题和布局，让您的博客在视觉上脱颖而出，吸引更多读者。',
            },
            {
              icon: 'solar:pen-bold',
              title: '强大编辑器',
              description: '内置多功能Markdown编辑器，支持丰富的格式和多媒体内容，让创作更加流畅。',
            },
            {
              icon: 'carbon:chart-relationship',
              title: 'SEO优化',
              description: '内置SEO工具，帮助您的内容在搜索引擎中获得更好的排名，增加流量。',
            },
            {
              icon: 'ph:rocket-launch-fill',
              title: '高性能',
              description: '基于现代技术栈构建，确保您的博客加载迅速，提供卓越的用户体验。',
            },
            {
              icon: 'mdi:account-multiple',
              title: '社区互动',
              description: '内置评论系统和社交分享功能，促进与读者的互动和内容传播。',
            },
            {
              icon: 'iconoir:stats-report',
              title: '数据分析',
              description: '详细的访问统计和读者行为分析，帮助您了解内容表现并优化创作方向。',
            },
          ].map((feature, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 3, color: 'primary.main' }}>
                  <Iconify icon={feature.icon} width={40} height={40} />
                </Box>

                <Typography variant="h5" sx={{ mb: 2 }}>
                  {feature.title}
                </Typography>

                <Typography sx={{ color: 'text.secondary', flexGrow: 1 }}>
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 如何工作 */}
      <Box
        sx={{
          py: { xs: 8, md: 15 },
          background:
            theme.palette.mode === 'light'
              ? alpha(theme.palette.grey[100], 0.8)
              : alpha(theme.palette.grey[900], 0.8),
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', maxWidth: 400 }}>
                <MotivationIllustration />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h2" sx={{ mb: 4 }}>
                简单三步，开启您的博客之旅
              </Typography>

              <Stack spacing={4}>
                {[
                  {
                    number: '01',
                    title: '创建账户',
                    description: '只需几分钟，您就可以注册并设置您的个人博客空间。',
                  },
                  {
                    number: '02',
                    title: '选择主题',
                    description: '从多种精美主题中选择一个适合您内容风格的设计。',
                  },
                  {
                    number: '03',
                    title: '开始创作',
                    description: '使用我们直观的编辑器，开始撰写和发布您的第一篇文章。',
                  },
                ].map((step, index) => (
                  <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        fontSize: 20,
                        fontWeight: 'bold',
                        minWidth: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {step.number}
                    </Box>

                    <Box>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        {step.title}
                      </Typography>

                      <Typography sx={{ color: 'text.secondary' }}>{step.description}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Button
                variant="contained"
                size="large"
                sx={{ mt: 5 }}
                startIcon={<Iconify icon="eva:flash-fill" />}
              >
                立即注册
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 博客类型展示 */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 15 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            适合各种创作者的完美平台
          </Typography>

          <Typography sx={{ color: 'text.secondary', maxWidth: 680, mx: 'auto' }}>
            无论您是技术专家、旅行爱好者、美食评论家还是生活方式博主，Virosa Blog都能满足您的需求
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              title: '技术博客',
              image: '/assets/illustrations/illustration-dashboard.webp',
              description: '分享您的技术见解、教程和行业动态，建立您的专业影响力。',
            },
            {
              title: '生活方式',
              image: '/assets/illustrations/illustration-rocket-large.webp',
              description: '记录您的日常生活、爱好和体验，与志同道合的读者建立联系。',
            },
            {
              title: '创意写作',
              image: '/assets/illustrations/illustration-receipt.webp',
              description: '展示您的创意作品，无论是诗歌、故事还是随笔，让您的文字触动人心。',
            },
            {
              title: '专业知识',
              image: '/assets/illustrations/illustration-upgrade.webp',
              description: '分享您所在领域的专业知识和见解，建立您的权威地位。',
            },
          ].map((type, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <Card
                sx={{
                  p: 0,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    backgroundImage: `url(${type.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {type.title}
                  </Typography>

                  <Typography sx={{ color: 'text.secondary', mb: 3, flexGrow: 1 }}>
                    {type.description}
                  </Typography>

                  <Button
                    color="inherit"
                    endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    了解更多
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 行动召唤 */}
      <Box
        sx={{
          py: { xs: 10, md: 15 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            准备好开始您的博客之旅了吗？
          </Typography>

          <Typography sx={{ mb: 5, opacity: 0.8 }}>
            加入成千上万的创作者，在Virosa Blog平台上分享您的故事和见解。现在注册，即刻开始！
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: alpha(theme.palette.common.white, 0.9),
              },
              px: 4,
              py: 1.5,
            }}
          >
            立即创建您的博客
          </Button>
        </Container>
      </Box>
    </DashboardContent>
  );
}
