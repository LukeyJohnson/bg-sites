"""Build the curated Videos page from content/videos.json; no network at build time."""

import datetime
import html
import json
import pathlib
import re

from mkdocs.exceptions import PluginError


def esc(value):
    return html.escape(str(value), quote=True)


def duration(seconds):
    minutes, seconds = divmod(seconds, 60)
    return f"{minutes}:{seconds:02d}"


def player(video):
    return f'''<div class="bg-video-media">
      <a class="bg-video-load" href="https://www.youtube.com/watch?v={esc(video['id'])}"
         data-video-id="{esc(video['id'])}" data-video-title="{esc(video['title'])}">
        <img src="../{esc(video['poster'])}" alt="" width="1280" height="720" loading="lazy">
        <span class="bg-video-play"><span aria-hidden="true">▶</span> Load video</span>
        <span class="bg-video-duration">{duration(video['duration_seconds'])}</span>
      </a>
    </div>'''


def card(video):
    views = video['view_count']
    count = f"{views / 1000:.1f}K" if views >= 1000 else str(views)
    credit = f'<p class="bg-video-credit">{esc(video["credit"])}</p>' if video.get('credit') else ''
    return f'''<article class="bg-video-card">
      {player(video)}
      <div class="bg-video-card-copy">
        <p class="bg-video-meta">{esc(video['published'][:4])} <span aria-hidden="true">/</span> {count} views</p>
        <h3>{esc(video['title'])}</h3>
        <p>{esc(video['description'])}</p>
        {credit}
        <a class="bg-video-youtube" href="https://www.youtube.com/watch?v={esc(video['id'])}">Watch on YouTube <span aria-hidden="true">↗</span></a>
      </div>
    </article>'''


def render(data):
    featured = data['featured']
    groups = ''.join(f'''<section class="bg-video-section" aria-labelledby="{esc(group['id'])}">
      <div class="bg-video-section-heading"><div><p class="bg-eyebrow">{'02 / From the archive' if index == 0 else '03 / Connected construction'}</p>
      <h2 id="{esc(group['id'])}">{esc(group['title'])}</h2></div><p>{esc(group['intro'])}</p></div>
      <div class="bg-video-grid">{''.join(card(video) for video in group['videos'])}</div>
    </section>''' for index, group in enumerate(data['groups']))
    date = datetime.date.fromisoformat(data['views_checked'])
    return f'''<div class="bg-videos">
      <header class="bg-videos-hero">
        <p class="bg-eyebrow">Black Grid / On screen</p>
        <h1>Ideas. Workflows.<br><span>Real-world perspective.</span></h1>
        <div class="bg-videos-intro"><p>Talks, Deep Space demonstrations and practical BIM knowledge from Black Grid AI and What Revit Wants. Start with the big picture, then get into the detail.</p>
        <a class="bg-button bg-button-secondary" href="{esc(data['channel']['url'])}">Explore the channel <span aria-hidden="true">↗</span></a></div>
      </header>
      <section class="bg-video-feature" aria-labelledby="video-feature-title">
        {player(featured)}
        <div class="bg-video-feature-copy"><p class="bg-eyebrow">01 / On stage · Something Tech 2025</p>
          <h2 id="video-feature-title">Building Deep Space.<br>Connecting construction.</h2>
          <p>{esc(featured['description'])}</p>
          <p class="bg-video-meta">Luke Johnson <span aria-hidden="true">/</span> River City Labs <span aria-hidden="true">/</span> {duration(featured['duration_seconds'])}</p>
          <a class="bg-text-link" href="https://www.youtube.com/watch?v={esc(featured['id'])}">Watch the Something Tech talk <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <p class="bg-video-player-note">Choose “Load video” to open a YouTube player here, or use the YouTube links to watch there.</p>
      <p class="bg-video-status" role="status" aria-live="polite"></p>
      {groups}
      <div class="bg-video-footer"><p>View counts checked {date.day} {date.strftime('%B %Y')}. Archive videos reflect the software available when recorded.</p>
      <a href="{esc(data['channel']['url'])}">More from Black Grid AI / What Revit Wants ↗</a></div>
    </div>'''


def on_page_markdown(markdown, page, config, files):
    if page.file.src_uri != 'videos.md':
        return markdown
    root = pathlib.Path(config['config_file_path']).parent
    data = json.loads((root / 'content/videos.json').read_text(encoding='utf-8'))
    videos = [data['featured'], *(video for group in data['groups'] for video in group['videos'])]
    ids = set()
    for video in videos:
        if not re.fullmatch(r'[A-Za-z0-9_-]{11}', video['id']) or video['id'] in ids:
            raise PluginError(f"Invalid or duplicate YouTube video ID: {video['id']!r}")
        ids.add(video['id'])
        if video['poster'] != f"assets/videos/{video['id']}.jpg" or not (root / 'docs' / video['poster']).is_file():
            raise PluginError(f"Missing local video poster: {video['poster']!r}")
        if not isinstance(video['duration_seconds'], int) or video['duration_seconds'] <= 0:
            raise PluginError(f"Invalid duration for video {video['id']}")
    return markdown.replace('<!-- BLACK_GRID_VIDEOS -->', render(data))
