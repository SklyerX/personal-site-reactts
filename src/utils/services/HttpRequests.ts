import axios from "axios";
import { config as settings } from "../config";

export function getSkills() {
  let data = JSON.stringify({
    query: `{
        skills {
        Name,
        Image
      }
    }`,
    variables: {},
  });

  let config = {
    method: "post",
    url: `${settings.urls.api}/graphql`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function getTestimonials() {
  let data = JSON.stringify({
    query: `{
        testimonials {
        Name,
        Message
      }
    }`,
    variables: {},
  });

  let config = {
    method: "post",
    url: `${settings.urls.api}/graphql`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function getProjects() {
  let data = JSON.stringify({
    query: `{
    projects {
      Title,
      Description,
      Links { Name, Url },
      Tags,
      Image
      Id
    }
  }`,
    variables: {},
  });

  let config = {
    method: "post",
    url: `${settings.urls.api}/graphql`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function getRepos() {
  let config = {
    method: "get",
    url: `https://api.github.com/users/${settings.names.githubUsername}/repos`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
}

export function getAccountInfo() {
  let config = {
    method: "get",
    url: `https://api.github.com/users/${settings.names.githubUsername}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config);
}

export function getBlogs() {
  let data = JSON.stringify({
    query: `{
      blogs {
        Title,
        Description,
        Tags {Name},
        Code,
        Unixtimestamp
      }
    }`,
    variables: {},
  });

  let config = {
    method: "post",
    url: `${settings.urls.api}/graphql`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}

export function getBlog(code: string) {
  let data = JSON.stringify({
    query: `{
    blog(code: "${code}") {
      Title,
      Description,
      Unixtimestamp,
      HTML,
      Code,
      Tags {Name}
    }
  }`,
    variables: {},
  });

  let config = {
    method: "post",
    url: `${settings.urls.api}/graphql`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}
