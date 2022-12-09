export type SkillsType = {
  id: string;
  Name: string;
  Image: string;
};

export type TestimonialType = {
  Name: string;
  Message: string;
};

export type RepositoriesType = {
  created_at: string;
  updated_at: string;
  mirror_url: string;
  description: string;
  name: string;
  license: {
    key: string;
    name: string;
  };
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
};

export type GithubAccountType = {
  login: string;
  avatar_url: string;
};

export type BlogsType = {
  Title: string;
  Description: string;
  Tags: TagObject[];
  Code: string;
  Unixtimestamp: string;
};

export type BlogType = {
  Title: string;
  Tags: TagObject[];
  Unixtimestamp: string;
  HTML: string;
};

export type ProjectsType = {
  Title: string;
  Description: string;
  Tags: string[];
  Links: LinksObject[];
  Image: string;
  Id: number;
};

export type LinksObject = {
  Name: string;
  Url: string;
};
export type TagObject = {
  Name: string;
};
