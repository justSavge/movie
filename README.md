项目: <a href="https://lijun-movie.netlify.app/" target="_blank">电影评分</a>
<br/>
技术栈:react + redux + styled-components<br/>

- 负责使用 React 和 Redux 构建了本项目，提高了应用的性能和可维护性。<br/>
- 设计实现了多个自定义 Hook,如 useFetchMovie(用于封装对后端的请求)和 useLocalStorage(用于处理将 state 与 localStorage 绑定，修改 state 即修改本地储存)，有效抽象了共用逻辑，减少了代码冗余。<br/>
- 使用了 redux 对 ui state 进行管理，集中处理数据（将 app.js 中 30+个 props 优化到只有 4 个参数，8 个传递），减少了 props 钻透，提高了可拓展性。<br/>
- 使用 styled-components 处理了样式逻辑。<br/>
  <br/>
  问题记录：
  <br/> 1.重复点击点击搜索结果报错。
  <br/>
  原因：在 reducer 中函数使用 return state.selectedId = "";在 redux 使用中修改了原 state，直接赋值或返回新值是不同的
  <br/>
  处理：修改为 state.selectedId = "";return;
  <br/> 2.上线以后发现无法使用 api。
  <br/>
  原因：不支持对 http 协议的访问
  <br/>
  处理：还好 api 有 https 版本，直接修改 api 即可
  <br/>
  <br/>
  已上线于：https://lijun-movie.netlify.app/<br/>
  <br/>
  用户意见反馈
  <br/> 1.分享功能太过简陋，将大量 json 数据发送给朋友太原始了。
  <br/>
  处理思路：
  <br/>
  a:提供一个接口，允许用户上传数据，生成唯一识别网址，好友可以通过点击网址实现数据导入<br/>
  不采用：网址的后端由免费 api 提供，如果使用办法 a 那么需要构建后端，搭建服务器，时间，精力，经济上不允许。
  <br/>
  b:简化数据形式，将传递的大量 json 数据优化为少量关键数据，仅保留 id,实现将大量数据优化为少量数据
  <br/>
  采用：同时可以将本地储存数据优化为仅保存 id 和个人评分，每次进入使用 useFetchMovie 获取数据。<br/>
  解决：计划在未来三个月内抽出 1~3 天的时间一并解决积累问题。(版本1.0.2)
  <br/> 2.不会打分，不知道操作<br/>
  a:为第一次使用的用户提供新手教学<br/>
  不采用：1.因为本网站无后端，无法确认是否是第一次使用。<br/>
  b:制作演示 ppt 或者文档等使用说明<br/>
  不采用：非技术性问题,且本网站十分简洁，不计划提供 ppt 或者文档等使用说明。
  c:本项目不计划大规模使用，仅在作者朋友间流通，所有使用时如果不会可以及时告知。
  采用&解决：由于本次使用人员是我的朋友,故我可以告知如何使用。
  <br/>

  3.没有修改评分功能<br/>
  <br/>
  处理思路：
  <br/>
  可以拓展一个组件，为右边栏添加一个图标，点击展示窗口，窗口用于解决修改评分
  <br/>
  采用：为右边栏加入一个图标，点击展示窗口（可尝试复用 window 组件），窗口使用函数 handleChangePoint 来修改 watched 修改评分。<br/>
  解决：计划在未来三个月内抽出 1~3 天的时间一并解决积累问题。(版本1.0.2)<br/><br/>

本项目为爱看电影的朋友提供了以下功能<br/> 1.搜索电影(通过自定义 hook,useFetchMovie 实现,一旦 query(搜索值)更新，就会立刻执行获取数据)<br/> 2.可以查看电影详情(点击修改 selectedID,使用 useSelector 依据点击 id 查询)<br/> 3.为电影评分，并且保存(复用组件 submitStar,保存则使用了自定义 hook:useLocalStorage,修改 watched(state)即可对本地 localstoarge 修改)<br/> 4.可以生成清单，分享给好友，提供分享，导入功能(分享：通过对本地值转化为 json 格式，复制到剪切板，导入：异步获取剪切板数据，将导出的 json 转化为数组，使用 useLocalStorage 传入本地)<br/>
计划使用 redux 提供 ui-state 管理<br/>
计划使用 localstarge 实现保存评分功能，注：本网站暂时无后端，使用免费 api<br/>
计划使用 netlify 托管网站，实现上线。<br/>
