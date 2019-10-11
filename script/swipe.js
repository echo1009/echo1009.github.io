window.Swipe = (function() {
    
    this.candidates = {};
    this.activate = null;
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    
    this.construct = (id, callback) => {
        this.candidates[id] = callback;
        
        let e   = document.getElementById(id);
        let tid = id;
        e.addEventListener("mousedown",  e => this.onDown(tid, e));
        e.addEventListener("touchstart", e => this.onDown(tid, e));
    };
    
    this.init = () => {
        window.addEventListener("touchmove", e => this.onMove(e));
        window.addEventListener("mouseup",   e => this.onUp(e));
        window.addEventListener("touchend",  e => this.onUp(e));
    };
    
    this.onDown = (id, e) => {
        if (null != e && null != e.target && null == this.activate) {
            if (id in this.candidates) {
                this.activate = id;
            }
            if (null != e.targetTouches) {
                this.startX = e.targetTouches[0].screenX;
                this.startY = e.targetTouches[0].screenY;
            } else {
                this.startX = e.screenX;
                this.startY = e.screenY;
            }
        }
    };
    
    this.onMove = (e) => {
        if (null != e && null != this.activate) {
            this.endX = e.targetTouches[0].screenX;
            this.endY = e.targetTouches[0].screenY;
        }
    }
    
    this.onUp = (e) => {
        if (null != e && null != this.activate) {
            if (null == e.targetTouches) {
                this.endX = e.screenX;
                this.endY = e.screenY;
            }
            var offsetX = this.endX - this.startX;
            var offsetY = this.endY - this.startY;
            var len     = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
            var deg     = Math.acos(offsetY / len) * 180 / Math.PI;
            if (offsetX < 0) deg = 360 - deg;
            
            temp = this.activate;
            this.activate = null;
            
            this.candidates[temp]({
                "deg": deg,
                "len": len
            });
        }
    };
    
    this.init();
    return construct;
    
})();