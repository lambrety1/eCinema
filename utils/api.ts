import { Cast, Item, MovieDetail, VideoTrailer } from "./types";

import axios from "./axios";

const HomeAPIRoutes: { [key: string]: { url: string; type: "tv" | "movie" } } = {
  "Trending Movies": { url: "/trending/movie/week", type: "movie" },
  "Popular Movies": { url: "/movie/popular", type: "movie" },
  "Top Rated Movies": { url: "/movie/top_rated", type: "movie" },
  "Trending TV": { url: "/trending/tv/week", type: "tv" },
  "Popular TV": { url: "/tv/popular", type: "tv" },
  "Top Rated TV": { url: "/tv/top_rated", type: "tv" },
};

export const getHomeData: () => Promise<{ [id: string]: Item[] }> = async () => {
  const promises = await Promise.all(Object.keys(HomeAPIRoutes).map((item) => axios.get(HomeAPIRoutes[item].url)));

  const data = promises.reduce((final, current, index) => {
    final[Object.keys(HomeAPIRoutes)[index]] = current.data.results.map((item: any) => ({ ...item, type: HomeAPIRoutes[Object.keys(HomeAPIRoutes)[index]].type }));
    return final;
  }, {} as { [id: string]: Item[] });

  return data;
};

export const getMovieDetails: (id: string) => Promise<{ data: MovieDetail; casts: Cast[]; similar: Item[]; videos: VideoTrailer[] }> = async (id) => {
  const labels = ["data", "casts", "similar", "videos"];

  const result = (await Promise.all([axios.get(`/movie/${id}`), axios.get(`/movie/${id}/credits`), axios.get(`/movie/${id}/similar`), axios.get(`/movie/${id}/videos`)])).reduce((final, current, index) => {
    if (labels[index] === "data") {
      final[labels[index]] = current.data;
    } else if (labels[index] === "casts") {
      final[labels[index]] = current.data.cast.filter((item: any) => item.name && item.character && item.profile_path).slice(0, 10);
    } else if (labels[index] === "similar") {
      final[labels[index]] = current.data.results.map((item: any) => ({ ...item, type: "movie" }));
    } else if (labels[index] === "videos") {
      final[labels[index]] = current.data.results.filter((item: any) => item.name && item.site === "YouTube");
    }

    return final;
  }, {} as any);

  return result;
};