import { request, requestGet} from "./request";
export const login = (data) => {
  return request({
    url: "/web/login",
    method: "post",
    data,
  });
};

// 用户登出
export const logout = (username, password) => {
  return new Promise((resolve, reject) => {
    resolve()
    localStorage.clear();
  });
};

// 用户注册
export const register = (data) => {
  return request({
    url: "/web/register",
    method: "post",
    data,
  });
};
export function getTasks(data) {
  return request({
    method: "POST",
    url: "/web/getTasks",
    data,
  });
}
export function insertTasks(data) {
  return request({
    method: "POST",
    url: "/web/insertTasks",
    data,
  });
}

export function deleteTasks(data) {
  return request({
    method: "POST",
    url: "/web/deleteTasks",
    data,
  });
}

export function updateTasks(data) {
  return request({
    method: "POST",
    url: "/web/updateTasks",
    data,
  });
}
export function getTaskStatistics(data) {
  return request({
    method: "POST",
    url: "/web/getTaskStatistics",
    data,
  });
}
export function getLast3MonthTasks(data) {
  return request({
    method: "POST",
    url: "/web/getLast3MonthTasks",
    data,
  });
}

export function getLast3MonthAbstractTasks(data) {
  return request({
    method: "POST",
    url: "/web/getLast3MonthAbstractTasks",
    data,
  });
}

export function getLogs(data) {
  return request({
    method: "get",
    url: "/web/getLogs",
    data,
  });
}
export function insertLogs(data) {
  return request({
    method: "POST",
    url: "/web/insertLogs",
    data,
  });
}

export function deleteLogs(data) {
  return request({
    method: "POST",
    url: "/web/deleteLogs",
    data,
  });
}

export function updateLogs(data) {
  return request({
    method: "POST",
    url: "/web/updateLogs",
    data,
  });
}

export function getQuerys(data) {
  return request({
    method: "get",
    url: "/web/getQuerys",
    data,
  });
}

export function getGits(data) {
  return request({
    method: "POST",
    url: "/web/getGits",
    data,
  });
}
export function insertGits(data) {
  return request({
    method: "POST",
    url: "/web/insertGits",
    data,
  });
}

export function deleteGits(data) {
  return request({
    method: "POST",
    url: "/web/deleteGits",
    data,
  });
}

export function updateGits(data) {
  return request({
    method: "POST",
    url: "/web/updateGits",
    data,
  });
}

export function getSentences(data) {
  return request({
    method: "POST",
    url: "/web/getSentences",
    data,
  });
}
export function insertSentences(data) {
  return request({
    method: "POST",
    url: "/web/insertSentences",
    data,
  });
}

export function deleteSentences(data) {
  return request({
    method: "POST",
    url: "/web/deleteSentences",
    data,
  });
}

export function updateSentences(data) {
  return request({
    method: "POST",
    url: "/web/updateSentences",
    data,
  });
}

export function getLast3MonthFinishedTasks(data) {
  return request({
    method: "post",
    url: "/web/getLast3MonthFinishedTasks",
    data,
  });
}

export function getCaptcha(query) {
  return requestGet({
    method: "get",
    url: "/web/getCaptcha",
    query,
  });
}

export function getUpdateVersion(query) {
  return requestGet(
    {
      method: "get",
      url: "https://gitee.com/zhanhongzhu/zhanhongzhu/raw/master/update.json",
      query,
    },
    true
  );
}

export function insertSuggestions(data) {
  return request({
      method: 'post',
      url: '/web/insertSuggestions',
      data
  })
}
export function deleteSuggestions(data) {
  return request({
      method: 'post',
      url: '/web/deleteSuggestions',
      data
  })
}
export function updateSuggestions(data) {
  return request({
      method: 'post',
      url: '/web/updateSuggestions',
      data
  })
}
export function getSuggestions(data) {
  return request({
      method: 'post',
      url: '/web/getSuggestions',
      data
  })
}
export function insertTags(data) {
  return request({
      method: 'post',
      url: '/web/insertTags',
      data
  })
}

export function updateTags(data) {
  return request({
      method: 'post',
      url: '/web/updateTags',
      data
  })
}

export function getTags(data) {
  return request({
      method: 'post',
      url: '/web/getTags',
      data
  })
}
export function deleteTags(data) {
  return request({
      method: 'post',
      url: '/web/deleteTags',
      data
  })
}

export function getCategory(data) {
  return request({
      method: 'post',
      url: '/web/getCategory',
      data
  })
}

export function insertCategory(data) {
  return request({
      method: 'post',
      url: '/web/insertCategory',
      data
  })
}

export function updateCategory(data) {
  return request({
      method: 'post',
      url: '/web/updateCategory',
      data
  })
}

export function deleteCategory(data) {
  return request({
      method: 'post',
      url: '/web/deleteCategory',
      data
  })
}

export function getHabits(data) {
  return request({
      method: 'post',
      url: '/web/getHabits',
      data
  })
}

export function insertHabits(data) {
  return request({
      method: 'post',
      url: '/web/insertHabits',
      data
  })
}

export function updateHabits(data) {
  return request({
      method: 'post',
      url: '/web/updateHabits',
      data
  })
}

export function deleteHabits(data) {
  return request({
      method: 'post',
      url: '/web/deleteHabits',
      data
  })
}

export function insertClocks(data) {
  return request({
      method: 'post',
      url: '/web/insertClocks',
      data
  })
}

export function getClocks(data) {
  return request({
      method: 'post',
      url: '/web/getClocks',
      data
  })
}

export function getOkrs(data) {
  return request({
      method: 'post',
      url: '/web/getOkrs',
      data
  })
}

export function insertOkrs(data) {
  return request({
      method: 'post',
      url: '/web/insertOkrs',
      data
  })
}

export function updateOkrs(data) {
  return request({
      method: 'post',
      url: '/web/updateOkrs',
      data
  })
}
export function deleteOkrs(data) {
  return request({
      method: 'post',
      url: '/web/deleteOkrs',
      data
  })
}
export function getClocksStatistic(data) {
  return request({
      method: 'post',
      url: '/web/getClocksStatistic',
      data
  })
}

export function getAllFileList(data) {
  return request({
      method: 'post',
      url: '/web/getAllFileList',
      data
  })
}
export function updateUser(data) {
  return request({
      method: 'post',
      url: '/web/updateUser',
      data
  })
}

export function getUserAvater(data) {
  return request({
      method: 'post',
      url: '/web/getUserAvater',
      data
  })
}

export function insertUserAvater(data) {
  return request({
      method: 'post',
      url: '/web/insertUserAvater',
      data
  })
}

export function updateUserAvater(data) {
  return request({
      method: 'post',
      url: '/web/updateUserAvater',
      data
  })
}


export function getUser(data) {
  return request({
      method: 'post',
      url: '/web/getUser',
      data
  })
}
export function insertLoginLogs(data) {
  return request({
      method: 'post',
      url: '/web/insertLoginLogs',
      data
  })
}

// 用户访问信息
export function publicConfig(fn = () => { }) {
  const userIP = async() => {
      const response = await fetch('https://api.ipify.org/?format=json')
      const data = await response.json()
      return data.ip
  }
  return Promise.all([userIP()]).then(([ip, location]) => {
      const result = {
          loginIP: ip,
          browserInfo: navigator.userAgent,
          loginAddress: lc + '' + lo,
          lo: lo,
          lc: lc
      }
      fn(result)
  })
}
