项目:电影评分<br/>
技术栈:react + redux + styled-components<br/>
- 负责使用React和Redux构建了本项目，提高了应用的性能和可维护性。<br/>
- 设计实现了多个自定义Hook,如useFetchMovie(用于封装对后端的请求)和useLocalStorage(用于处理将state与localStorage绑定，修改state即修改本地储存)，有效抽象了共用逻辑，减少了代码冗余。<br/>
- 使用了redux对ui state进行管理，集中处理数据（将app.js中30+个props优化到只有4个参数，8个传递），减少了props钻透，提高了可拓展性。<br/>
- 使用styled-components处理了样式逻辑。<br/>
<br/>
问题记录：<br/>
重复点击点击搜索结果报错。<br/>
原因：在reducer中函数使用return state.selectedId = "";在redux使用中修改了原state，直接赋值或返回新值是不同的<br/>
处理：修改为state.selectedId = "";return;<br/>
<br/>
<br/>
本项目为爱看电影的朋友提供了以下功能<br/>
1.搜索电影(通过自定义hook,useFetchMovie实现,一旦query(搜索值)更新，就会立刻执行获取数据)<br/>
2.可以查看电影详情(点击修改selectedID,使用useSelector依据点击id查询)<br/>
3.为电影评分，并且保存(复用组件submitStar,保存则使用了自定义hook:useLocalStorage,修改watched(state)即可对本地localstoarge修改)<br/>
4.可以生成清单，分享给好友，提供分享，导入功能(分享：通过对本地值转化为json格式，复制到剪切板，导入：异步获取剪切板数据，将导出的json转化为数组，使用useLocalStorage传入本地)<br/>
计划使用redux提供ui-state管理<br/>
计划使用localstarge实现保存评分功能，注：本网站暂时无后端，使用免费api<br/>
计划使用netlify托管网站，实现上线。