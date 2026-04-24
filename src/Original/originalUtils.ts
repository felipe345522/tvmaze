import type { Show } from '../types';

export const getOriginalShowList = (shows: Show[]) =>
  shows.filter(show => Boolean(show.network)).slice(0, 48);

export const filterShowsByGenres = (shows: Show[], genres: string[]) =>
  genres.length === 0 ? shows : shows.filter(show => genres.some(genre => show.genres.includes(genre)));

export const getUniqueGenres = (shows: Show[]) =>
  Array.from(new Set(shows.flatMap(show => show.genres))).sort();

export const formatShowRating = (show: Show) => {
  const value = show.rating.average;
  return value === null || value === undefined ? 'N/A' : value.toFixed(1);
};

export const computeOriginalityScore = (show: Show) => {
  const genreScore = show.genres.length * 10;
  const ratingScore = (show.rating.average ?? 0) * 5;
  const summaryScore = Math.min((show.summary?.length ?? 0) / 100, 10);
  const networkBonus = show.network ? 10 : 0;
  return Math.round(genreScore + ratingScore + summaryScore + networkBonus);
};

export const createOriginalShowTag = (show: Show) => {
  const networkLabel = show.network?.name ? `Este show original de ${show.network.name}` : 'Este show original';
  const genreLabel = show.genres.length > 0 ? ` combina ${show.genres.slice(0, 2).join(' y ')}` : '';
  const mood = show.rating.average && show.rating.average >= 8 ? 'una experiencia premium' : 'una propuesta interesante';
  return `${networkLabel}${genreLabel} y es ${mood}.`;
};

export const getTopOriginalShows = (shows: Show[], top = 3) =>
  [...shows]
    .sort((a, b) => computeOriginalityScore(b) - computeOriginalityScore(a))
    .slice(0, top);
