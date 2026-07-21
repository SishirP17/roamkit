// Aggregates every survival article into flat + indexed lookups and provides an
// offline, plain-language search. Content lives in articles/*.js (one file per
// category). This file stays tiny; adding a topic means editing a category file.

import { CATEGORIES, CATEGORY_BY_ID } from './categories';

import priorities from './articles/priorities';
import firstAid from './articles/first-aid';
import coldHeat from './articles/cold-heat';
import water from './articles/water';
import fire from './articles/fire';
import shelter from './articles/shelter';
import weather from './articles/weather';
import navigation from './articles/navigation';
import signalling from './articles/signalling';
import animalsPlants from './articles/animals-plants';
import food from './articles/food';

export { CATEGORIES, CATEGORY_BY_ID };

// Category id -> article[] (kept in category order via CATEGORIES).
// Null-prototype: these are looked up with raw route params, and a plain object
// would return Object.prototype members for ids like "constructor".
const GROUPS = Object.assign(Object.create(null), {
  priorities,
  'first-aid': firstAid,
  'cold-heat': coldHeat,
  water,
  fire,
  shelter,
  weather,
  navigation,
  signalling,
  'animals-plants': animalsPlants,
  food,
});

export const ARTICLES_BY_CATEGORY = GROUPS;

// Flat list, in category order.
export const ARTICLES = CATEGORIES.flatMap((c) => GROUPS[c.id] || []);

export const ARTICLE_BY_ID = Object.assign(
  Object.create(null),
  Object.fromEntries(ARTICLES.map((a) => [a.id, a]))
);

// Life-critical shortcuts for the red "In an emergency" row (most severe first).
export const EMERGENCY_ARTICLES = ARTICLES.filter((a) => a.emergency).sort(
  (a, b) => (a.severity || 9) - (b.severity || 9)
);

export function getArticle(id) {
  return ARTICLE_BY_ID[id];
}

export function articlesInCategory(categoryId) {
  return GROUPS[categoryId] || [];
}

// ── Search ───────────────────────────────────────────────────────────────────
// A precomputed lowercase "haystack" per article (title + summary + keywords).
// Search tolerates plain-language queries ("i'm bleeding") by dropping filler
// words and matching every remaining word as a substring (AND).
const SEARCH_INDEX = ARTICLES.map((a) => ({
  id: a.id,
  title: a.title,
  summary: a.summary,
  categoryId: a.categoryId,
  severity: a.severity || 3,
  titleText: a.title.toLowerCase(),
  haystack: [a.title, a.summary, (a.keywords || []).join(' ')]
    .join(' ')
    .toLowerCase(),
}));

const STOP_WORDS = new Set([
  'i', 'im', 'ive', 'a', 'an', 'the', 'my', 'me', 'is', 'am', 'are', 'be',
  'was', 'have', 'has', 'to', 'of', 'in', 'on', 'at', 'by', 'for', 'from',
  'into', 'out', 'up', 'and', 'or', 'if', 'so', 'how', 'do', 'can',
  'what', 'with', 'someone', 'somebody', 'they', 'he', 'she', 'it', 'got',
  'get', 'need', 'about',
]);

function tokenize(query) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    // Drop filler words and single letters (a lone "t" would match everything).
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));
}

// Returns ranked article stubs ({ id, title, summary, categoryId }). Empty query
// or a query that is all filler words returns []. Matching is "any word", scored
// so the article hitting the most query words (and by title) ranks first, so a
// natural phrase like "burnt my hand" still finds Burns even though "hand" is not
// in the text.
export function searchArticles(query) {
  if (!query || !query.trim()) return [];
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const results = [];
  for (const row of SEARCH_INDEX) {
    let score = 0;
    for (const t of tokens) {
      if (row.haystack.includes(t)) {
        score += row.titleText.includes(t) ? 3 : 1;
      }
    }
    if (score > 0) {
      // Life-critical topics float up (severity 1 outranks 3).
      score += (4 - row.severity) * 0.5;
      results.push({ row, score });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(({ row }) => ({
      id: row.id,
      title: row.title,
      summary: row.summary,
      categoryId: row.categoryId,
    }));
}

// Assembles an article into one spoken string for read-aloud (expo-speech).
// Reading order: title, summary, the "Do this now" steps, then each section.
export function articleToSpeech(article) {
  if (!article) return '';
  const parts = [article.title + '.'];
  if (article.summary) parts.push(article.summary);
  if (article.quickSteps && article.quickSteps.length) {
    parts.push('Do this now.');
    article.quickSteps.forEach((s, i) => parts.push('Step ' + (i + 1) + '. ' + s));
  }
  (article.sections || []).forEach((sec) => {
    if (sec.heading) parts.push(sec.heading + '.');
    (sec.paragraphs || []).forEach((p) => parts.push(p));
    (sec.steps || []).forEach((s, i) => parts.push('Step ' + (i + 1) + '. ' + s));
    if (sec.warning) parts.push('Warning. ' + sec.warning);
  });
  return parts.join('\n');
}
