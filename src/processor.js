import vid from "./video.mp4";

let l_r = 20,
    l_g = 180,
    l_b = 20,
    d_r = 35,
    d_g = 100,
    d_b = 40;

let tolerance = 0.075;

const processor = {
    timerCallback: function () {
        if (this.video.paused || this.video.ended) {
            return;
        }
        this.computeFrame();
        let self = this;
        window.requestAnimationFrame(() => self.timerCallback());
        // setTimeout(function () {
        //   self.timerCallback();
        // }, 0);
    },

    doLoad: function () {
        // this.h1 = document.createElement
        this.video = document.createElement("video");
        this.video.preload = "auto";
        // this.video.addEventListener("canplay", () => this.video.play(), false);
        this.video.innerHTML = `<source src=${vid} type="video/mp4" />`;
        // if (this.video.canPlayType("video/mp4")) this.video.src = "video.mp4";
        this.video.autoplay = true;
        this.video.muted = false;
        this.video.loop = true;
        // this.video = document.getElementById("video");
        // this.video.width = "600";
        // this.video.height = "300";
        // this.video.autoplay = true;
        // // document.getElementById("vidhere")?.append(this.video);
        // this.h = document.createElement("h1");
        // this.h.innerHTML = "headeradsf";
        //console.log(this.video);
        // document.getElementById("vidhere")?.append(this.video);
        this.c1 = document.createElement("canvas");
        this.c1.height = "300";
        this.c1.width = "600";
        this.ctx1 = this.c1?.getContext("2d");
        this.c2 = document.getElementById("c2");
        this.ctx2 = this.c2?.getContext("2d");
        // this.ctx2.imageSmoothingEnabled = false;
        let self = this;
        // window.onload = () => this.video?.play();
        //console.log("video", this.video);
        this.video?.addEventListener(
            "play",
            function () {
                self.width = self.video.videoWidth / 2;
                self.height = self.video.videoHeight / 2;
                self.timerCallback();
            },
            false
        );
    },
    calculateDistance: function (c, min, max) {
        if (c < min) return min - c;
        if (c > max) return c - max;

        return 0;
    },

    computeFrame: function () {
        this.ctx1.imageSmoothingEnabled = false;
        this.ctx1.drawImage(this.video, 0, 0, this.width / 4, this.height / 4);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        let l = frame.data.length / 4;
        // //console.log(l);
        for (let i = 0; i < l; i++) {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            let difference =
                this.calculateDistance(r, d_r, l_r) +
                this.calculateDistance(g, d_g, l_g) +
                this.calculateDistance(b, d_b, l_b);
            difference /= 255 * 3; // convert to percent
            if (difference < tolerance) frame.data[i * 4 + 3] = 0;
            // if (g > 100 && r > 100 && b < 43) frame.data[i * 4 + 3] = 0;
            //   if (g >= 150 && r <= 201 && b <= 164) frame.data[i * 4 + 3] = 0;
        }
        this.ctx2.putImageData(frame, 0, 0);
        // window.requestAnimationFrame(() => this.timerCallback());
        return;
    },
};

export default processor;
