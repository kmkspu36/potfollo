import { useEffect, useSyncExternalStore } from 'react'
import './App.css'

function subscribeToNavigation(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getCurrentLocation() {
  return window.location.hash
}

const projects = [
  {
    number: '01',
    category: 'WEB · 웹사이트',
    title: '나의 포트폴리오',
    description: '나를 자기소개하는 사이트',
    style: 'website',
    overview: '나를 자기소개하는 사이트입니다.',
  },
]

function ProjectArtwork({ project, className = '' }) {
  return (
    <div className={`project-art ${project.style} ${className}`} aria-hidden="true">
      <span className="project-number">{project.number}</span>
      {project.style === 'website' && <div className="mini-browser"><div className="mini-toolbar"><i /><i /><i /></div><div className="mini-layout"><span>HELLO!</span><div /><p>My little corner<br />of the internet.</p></div></div>}
      {project.style === 'idea' && <><div className="idea-circle" /><span className="idea-asterisk">✳</span><span className="idea-caption">WHAT IF?</span></>}
      {project.style === 'creative' && <><div className="creative-shape shape-one" /><div className="creative-shape shape-two" /><span className="creative-caption">make<br /><em>something.</em></span></>}
    </div>
  )
}

function App() {
  const currentLocation = useSyncExternalStore(subscribeToNavigation, getCurrentLocation)
  const isPortfolioPage = currentLocation === '#/portfolio'
  const isAboutPage = currentLocation === '#/about' || currentLocation === '#about'
  const isProjectPage = currentLocation.startsWith('#/portfolio/')
  const selectedProject = isProjectPage ? projects.find((project) => currentLocation === `#/portfolio/${project.style}`) : undefined

  useEffect(() => {
    document.title = isProjectPage ? `${selectedProject?.title ?? '프로젝트를 찾을 수 없어요'} | 나의 포트폴리오` : isPortfolioPage ? '포트폴리오 목록 | 나의 포트폴리오' : isAboutPage ? '자기소개 | 나의 포트폴리오' : '나의 포트폴리오'

    if (isPortfolioPage || isAboutPage || isProjectPage) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById(isProjectPage ? 'project-title' : isPortfolioPage ? 'portfolio-title' : 'about-page-title')?.focus({ preventScroll: true })
    } else {
      const targetId = currentLocation.slice(1) || 'home'
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    }
  }, [currentLocation, isPortfolioPage, isAboutPage, isProjectPage, selectedProject])

  return (
    <>
      <a className="skip-link" href="#main" onClick={(event) => { event.preventDefault(); document.getElementById('main')?.focus(); document.getElementById('main')?.scrollIntoView({ block: 'start' }) }}>본문으로 바로가기</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#home" aria-label="나의 포트폴리오 홈">
            <span className="brand-symbol" aria-hidden="true">✳</span> my portfolio<span className="brand-dot">.</span>
          </a>
          <nav aria-label="주요 메뉴">
            <a href="#/about" aria-current={isAboutPage ? 'page' : undefined}>자기소개</a>
            <a href="#/portfolio" aria-current={isPortfolioPage || isProjectPage ? 'page' : undefined}            >활동 <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {!isPortfolioPage && !isAboutPage && !isProjectPage && <>
        <section className="hero page-width" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> A LITTLE ABOUT ME, A LOT TO EXPLORE</p>
            <h1 id="hero-title">하나씩 천천히,<br />하지만 끈기 있게<br /><span className="underlined">해내는 jihoon입니다.</span></h1>
            <p className="hero-description">축구와 게임을 좋아하고, 꾸준히 운동하며 실력을 키우는 중입니다.<br />저를 소개하는 이곳에 오신 걸 환영해요.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#/about">자기소개 보기 <span aria-hidden="true">↗</span></a>
                            <a className="text-link" href="#/portfolio">활동 보기 <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-note"><span aria-hidden="true">✳</span> 완벽하지 않아도 괜찮아. 일단 시작해 보기!</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-grid" /><div className="art-orbit" /><span className="art-spark">✳</span>
            <div className="floating-label"><span className="status-dot" /> 계속 성장하는 중</div>
            <div className="project-window">
              <div className="window-bar"><span /><span /><span /><p>jihoon</p><span className="window-expand">↗</span></div>
              <div className="window-content">
                <span className="window-kicker">HELLO, WORLD!</span>
                <p className="window-title">나다운 것을<br />만들어 가는 일<span>.</span></p>
                <div className="window-scene"><div className="scene-circle" /><div className="scene-stairs"><i /><i /><i /></div><span>↗</span></div>
                <div className="window-footer"><span>CURIOUS MIND, CREATIVE HANDS</span><span>01 / ∞</span></div>
              </div>
            </div>
            <div className="idea-note"><span>NOTE TO SELF</span><p>오늘의 시도가<br />내일의 나를 만든다.</p><span className="note-arrow">⤴</span></div>
            <div className="art-caption">IDEA <span>→</span> MAKE <span>→</span> GROW</div>
          </div>
        </section>
        <div className="section-divider page-width"><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span></div>
        <section className="about-section page-width" id="about" aria-labelledby="about-title">
          <div className="section-heading"><p className="eyebrow">01 / ABOUT ME</p><h2 id="about-title">안녕하세요,<br />저는 jihoon입니다<span>.</span></h2></div>
          <div className="about-content">
            <h3>하나씩 천천히,<br />하지만 끈기 있게 해내는 jihoon입니다</h3>
            <p>축구와 게임을 좋아합니다. 앞으로 축구 실력을 늘리고 꾸준히 운동하는 것이 목표입니다.</p>
            <div className="interest-tags"><span># 축구</span><span># 게임</span><span># 꾸준한 운동</span></div>
            <a className="text-link about-more" href="#/about">자기소개 보기 <span aria-hidden="true">→</span></a>
          </div>
        </section>
        <section className="work-invitation">
          <div className="page-width work-invitation-inner">
            <div>            <p className="eyebrow">MY ACTIVITIES</p><h2>어떤 활동을 했을까요<span>?</span></h2><p className="invitation-description">해 본 활동과 작품은 준비되는 대로 이곳에 채워 갈게요.</p></div>
                        <a className="button button-primary" href="#/portfolio">활동 보기 <span aria-hidden="true">↗</span></a>
          </div>
        </section>
        </>}
        {isAboutPage && <section className="about-page page-width" aria-labelledby="about-page-title">
          <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로 돌아가기</a>
          <div className="about-page-heading">
            <p className="eyebrow">MY STORY / ABOUT ME</p>
            <h1 id="about-page-title" tabIndex={-1}>자기소개<span>.</span></h1>
            <p className="list-description">좋아하는 것과 배우는 것, 그리고 앞으로의 나에 대한 이야기.</p>
          </div>
          <div className="about-profile">
            <div className="about-profile-art" aria-hidden="true"><span>✳</span><p>STILL LEARNING,<br />ALWAYS GROWING.</p><div>나만의 속도로,<br />나만의 방향으로.</div></div>
            <div className="about-content">
              <h2>안녕하세요,<br />저는 jihoon입니다<span>.</span></h2>
              <p>하나씩 천천히, 하지만 끈기 있게 해내는 jihoon입니다.</p>
              <dl className="about-details">
                <div><dt>관심사와 취미</dt><dd>축구, 게임</dd></div>
                <div><dt>잘하는 것</dt><dd>끈기, 약속 지키기, 친구들과 잘 지내기</dd></div>
                <div><dt>배우고 싶은 것</dt><dd>축구 실력 늘리기</dd></div>
                <div><dt>앞으로의 목표</dt><dd>축구 실력 늘리기, 꾸준히 운동하기</dd></div>
              </dl>
              <a className="button button-primary" href="#/portfolio">활동 보기 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>}
        {isPortfolioPage && <section className="portfolio-section portfolio-page" aria-labelledby="portfolio-title">
          <div className="page-width">
            <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로 돌아가기</a>
            <div className="portfolio-heading"><div>            <p className="eyebrow">MY ACTIVITIES</p><h1 id="portfolio-title" tabIndex={-1}>활동<span>.</span></h1><p className="list-description">해 본 활동과 작품을 모아 두는 곳입니다.</p></div></div>
                        {projects.length === 0 && <div className="project-not-found"><h2>준비 중입니다.</h2><p>아직 소개할 활동이 없어요. 활동과 작품이 생기면 이곳에 추가할게요.</p><a className="button button-primary" href="#/about">자기소개 보기 <span aria-hidden="true">→</span></a></div>}
                        {projects.length > 0 && <div className="list-summary"><span>전체 활동</span><span>{projects.length.toString().padStart(2, '0')}</span></div>}
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <a className="project-card-link" href={`#/portfolio/${project.style}`} aria-label={`${project.title} 자세히 보기`}>
                    <ProjectArtwork project={project} />
                    <div className="project-category">{project.category}</div>
                    <h3>{project.title}</h3><p>{project.description}</p>
                    <span className="project-read-more">자세히 보기 <span aria-hidden="true">↗</span></span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>}
        {isProjectPage && <section className="project-detail page-width" aria-labelledby="project-title">
          <a className="text-link list-back" href="#/portfolio"><span aria-hidden="true">←</span> 포트폴리오 목록으로</a>
          {selectedProject ? <>
            <header className="detail-heading">
              <p className="eyebrow">PROJECT {selectedProject.number} / {selectedProject.category}</p>
              <h1 id="project-title" tabIndex={-1}>{selectedProject.title}<span>.</span></h1>
              <p className="list-description">{selectedProject.description}</p>
            </header>
            <div className="detail-banner">
              <ProjectArtwork project={selectedProject} className="detail-art" />
              <div className="detail-overview">
                <h2>프로젝트 소개</h2>
                <p>{selectedProject.overview}</p>
              </div>
            </div>
            <div className="detail-story">
              {selectedProject.goal && <section className="detail-story-section" aria-labelledby="project-goal"><h2 id="project-goal"><span>01</span> 왜 만들었나요?</h2><p>{selectedProject.goal}</p></section>}
              {selectedProject.process?.length > 0 && <section className="detail-story-section" aria-labelledby="project-process"><h2 id="project-process"><span>02</span> 어떻게 만들었나요?</h2><ol>{selectedProject.process.map((step) => <li key={step}>{step}</li>)}</ol></section>}
              {selectedProject.learning && <section className="detail-story-section" aria-labelledby="project-learning"><h2 id="project-learning"><span>03</span> 무엇을 배웠나요?</h2><p>{selectedProject.learning}</p></section>}
            </div>
            <div className="detail-bottom"><p>다른 작업도 둘러보세요.</p><a className="button button-primary" href="#/portfolio">목록으로 돌아가기 <span aria-hidden="true">→</span></a></div>
          </> : <div className="project-not-found"><h1 id="project-title" tabIndex={-1}>프로젝트를 찾을 수 없어요.</h1><p>주소를 확인하거나 포트폴리오 목록에서 작업을 선택해 주세요.</p><a className="button button-primary" href="#/portfolio">포트폴리오 목록 보기 <span aria-hidden="true">→</span></a></div>}
        </section>}
      </main>
      <footer className="site-footer page-width"><a className="wordmark" href="#home">my portfolio<span className="brand-dot">.</span></a><p>jihoon의 이야기는 계속됩니다.</p><button className="back-top" type="button" onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.getElementById('main')?.focus({ preventScroll: true }) }}>맨 위로 <span aria-hidden="true">↑</span></button></footer>
    </>
  )
}

export default App
