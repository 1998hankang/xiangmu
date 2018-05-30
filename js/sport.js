//获取非行内样式
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,true)[attr];
}
//运动框架
function startMove(obj,json,fn){
	//1.清除上一次的计时器
	clearInterval(obj.timer);
	//2.开启新的计时器
	obj.timer = setInterval(()=>{
		//1.设置开关（假设所有属性都达到目标）
		let stop = true;
		//2.遍历对象
		for(let attr in json){
			//1.获取当前值
			let cur = null;
			if(attr === 'opacity'){
				cur = parseInt(parseFloat(getStyle(obj,attr)) * 100);
			}else{
				cur = parseInt(getStyle(obj,attr));
			}
			//2.计算速度
			let speed = (json[attr] - cur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			//3.判断开关
			if(cur !== json[attr]){
				stop = false;
			}
			//4.设置运动 
			if(attr === 'opacity'){
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = 'alpha(opacity=' + (cur + speed) + ")";
			}else{
				obj.style[attr] = cur + speed + 'px';
			}
		}
		//3.检测停止
		if(stop){
			clearInterval(obj.timer);
			if(typeof fn === 'function'){
				fn();
			}
		}
	},30)
}
