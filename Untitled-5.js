function (t, e, i) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = i(74),
        s = r(n),
        a = i(94),
        o = r(a),
        h = i(95),
        l = r(h),
        u = i(3),
        c = r(u),
        f = i(112),
        p = i(163),
        d = function (t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
                for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e.default = t, e
        }(p),
        m = i(4),
        g = i(114),
        v = r(g),
        y = i(369),
        _ = r(y),
        b = i(371),
        x = r(b),
        w = i(372),
        T = r(w),
        E = i(373),
        S = r(E),
        P = i(375),
        C = r(P),
        M = i(376),
        A = r(M),
        k = function () {
            function t(e, i) {
                (0, o.default)(this, t), 
                this._css = {
                    stage: "features__stage"
                },  
                this._params = c.default.extend(!0, {}, this.constructor.DEFAULT_PARAMS, i), 
                this.$dispatcher = (0, c.default)({}), 
                this.$container = e, 
                this.$stage = e.find("." + this._css.stage), 
                this.currentFeatureIndex = -1, 
                this.featuresTotalAmount = this._params.texts.length, 
                this._strokesRenderer = new _.default({
                    fontFamily: this._params.fontFamily,
                    fontSize: this._params.fontSize
                }), 
                this._pixi = new d.Application(this.$container.width(), this.$container.height(), {
                    backgroundColor: 1184274,
                    resolution: v.default.devicePixelRatio,
                    forceFXAA: !1
                }), 
                this._backLouveringText = null, 
                this._topLouveringText = null, 
                this._subLouveringText = null, 
                this._flashingText = null, 
                this._backParticles = null, 
                this._topParticles = null, 
                this._initPromise = null, 
                this._strokeLettersTexture = null, 
                this._strokeLetters = null, 
                this._centerRect = null, 
                this._centerMask = null, 
                this._shadows = new d.Container, 
                this._vLines = new d.Container, 
                this._timeline = new f.TimelineMax, 
                this._mouseWheelDelayTween = null, 
                this._progressSpeedAccelerationTween = null, 
                this._progress = 0, 
                this._prevProgress = 0, 
                this._direction = 0, 
                this._showingDirection = 0, 
                this._strokeProgress = 0, this._progressSpeed = 0, this._progressSpeedAcceleration = 0, 
                this._isStarted = !1, 
                this._isPlaying = !1, 
                this._isMouseWheelBusy = !1, 
                this._size = {
                    w: 0,
                    h: 0
                }, 
                this._mousePos = {
                    x: 0,
                    y: 0
                }, 
                this.colorsBuffer = [], 
                this.colorsCanvasContext = null, 
                this._playBtn = null, 
                this._hitArea = null, 
                this._slowMo = f.SlowMo.ease.config(.1, .1, !0), 
                this._baseEasing = f.Power1.easeInOut, 
                this._mouseEasingPower = 0, 
                this._mouseEasingPowerTarget = 0, 
                this._mouseEasing_k = 100, 
                this._accelerationLimit = 1.5 * t.PROGRESS_SPEED_DEFAULT, 
                this._mouseEasingDelayTween = null, 
                this._strokeLettersTexture = d.Texture.fromCanvas(this._strokesRenderer.getCanvas()), 
                this._strokeLetters = new d.Sprite(this._strokeLettersTexture), 
                this._pixi.stage.addChild(this._strokeLetters), 
                this._pixi.stop(), 
                this.$stage.append(this._pixi.view), 
                this.$container.on("mousewheel mousemove", this._mouseListener.bind(this))
            }
            return (0, l.default)(t, [{
                key: "init",
                value: function () {
                    var t = this;
                    return this._initPromise || (this._initPromise = new s.default(function (e, i) {
                        var r = A.default,
                            n = t.$container.data("sprite");
                        d.loader.add({
                            url: n,
                            crossOrigin: !0
                        }).load(function (i, s) {
                            t._spriteSheet = new d.Spritesheet(s[n].texture.baseTexture, r), t._spriteSheet.parse(function () {
                                t._assetsLoaderListener(), e()
                            })
                        })
                    })), this._initPromise
                }
            }, {
                key: "prepare",
                value: function () {
                    this.update(!0)
                }
            }, {
                key: "start",
                value: function () {
                    this._isStarted = !0
                }
            }, {
                key: "stop",
                value: function () {
                    this._isStarted = !1, this._isPlaying = !1
                }
            }, {
                key: "showFeature",
                value: function (e) {
                    var i = this,
                        r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (!r && (e == this.currentFeatureIndex || this._isPlaying)) return !1;
                    var n, s = this._backLouveringText,
                        a = this._topLouveringText,
                        o = this._subLouveringText,
                        h = this._strokesRenderer,
                        l = this._flashingText,
                        u = this._backParticles,
                        c = this._topParticles,
                        p = this._playBtn;
                    if (this._progressSpeedAcceleration = 0, this._progressSpeedAccelerationTween && this._progressSpeedAccelerationTween.kill(), this._direction = e > this.currentFeatureIndex ? 1 : -1, this._timeline && this._timeline.kill(), this.getState() == t.PLAYING_COMPLETE_STATE) n = t.HIDING_TIME, this._progressSpeed = 1 / (60 * n), this._showingDirection = -1, this._timeline = new f.TimelineMax({
                        onComplete: function () {
                            i._progress = 0, i._isPlaying = !1, i.showFeature(e, r)
                        }
                    }), this._timeline.add(s.getTimeline(x.default.LOUVERING_OUT, .9 * n)).add(a.getTimeline(x.default.LOUVERING_OUT, .9 * n), 0).add(h.getTimeline(_.default.STROKING_OUT, n), 0), 0 == this.currentFeatureIndex && this._timeline.add(p.getTimeline(C.default.SHOWING_OUT, .65 * n), 0 * n), r && (this._progressSpeed = 1, requestAnimationFrame(function () {
                        i.update(!0)
                    }));
                    else {
                        if (this._prepareFeature(e), n = .75 * t.SHOWING_TIME, this._progressSpeed = 1 / (60 * n), this._showingDirection = 1, this._timeline = new f.TimelineMax({
                                onComplete: function () {
                                    i.update(), i.stopPlaying()
                                }
                            }), this._timeline.add(f.TweenMax.to(this._shadows, .15 * n, {
                                alpha: 1,
                                ease: f.Power0.easeNone
                            })).add(u.getTimeline(.75 * n), 0).add(c.getTimeline(.5 * n), .1 * n).add(h.getTimeline(_.default.STROKING_IN, .6 * n), .15 * n).add(o.getTimeline(x.default.LOUVERING_IN_OUT, .3 * n), .15 * n).add(a.getTimeline(x.default.LOUVERING_IN, .55 * n), .2 * n).add(function () {
                                i.$dispatcher.trigger(t.LOUVERINGS_PLAYING)
                            }, .4 * n).add(function () {
                                i.$dispatcher.trigger(t.LOUVERINGS_COMPLETE)
                            }, .5 * n).add(l.getTimeline(.2 * n), .15 * n).add(s.getTimeline(x.default.LOUVERING_IN, .4 * n, {
                                colors: !0
                            }), .35 * n), 0 == e && this._timeline.add(p.getTimeline(C.default.SHOWING_IN, .4 * n), .15 * n), this.currentFeatureIndex = e, r) return this._progressSpeed = 1, this._progress = 1, this.update(!0), this.stopPlaying(), void(this._progressSpeed = 0);
                        this.$dispatcher.trigger(t.PLAYING_STARTED)
                    }
                    return this._timeline.pause(), this._progress = 0, this._isPlaying = !0, !0
                }
            }, {
                key: "hideFeature",
                value: function () {
                    arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this._progress = 1 == this._showingDirection ? 0 : 1, this._progressSpeed = 0, this._progressSpeedAcceleration = 0, this._isPlaying = !1, this._shadows.alpha = 0, this._backParticles && this._backParticles.reset(), this._pixi.stage.removeChild(this._topParticles), this._topParticles = new S.default(d.Texture.fromFrame("particle-big.png"), {
                        amount: 200,
                        poolSize: 200,
                        offsetX: 250,
                        getColor: this._getColor.bind(this),
                        direction: S.default.FROM_CENTER
                    }), this._topParticles.mask = this._centerMask, this._topParticles.setSize(this._size.w, this._size.h), this._pixi.stage.addChildAt(this._topParticles, this._pixi.stage.getChildIndex(this._playBtn)), this.currentFeatureIndex = -1
                }
            }, {
                key: "getState",
                value: function () {
                    return this.currentFeatureIndex == -1 ? t.EMPTY_STATE : this._progress > 0 && this._progress < 1 ? t.PLAYING_STATE : 1 == this._progress ? t.PLAYING_COMPLETE_STATE : void 0
                }
            }, {
                key: "update",
                value: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (e || this._isPlaying) {
                        var r, n, s = 0,
                            a = 0,
                            o = .925 * this._progressSpeed;
                        this._progress += this._progressSpeed + this._progressSpeedAcceleration, this._progress < 0 && (this._progress = 0), this._progress > 1 && (this._progress = 1), n = this._baseEasing.getRatio(this._progress), this._mouseEasingPower += (this._mouseEasingPowerTarget - this._mouseEasingPower) / this._mouseEasing_k, 1 == this._showingDirection && n >= .075 && (r = Math.min((n - .075) / .15, 1), s = 1 - Math.pow(-1 + 2 * Math.min(r, 1), 2)), a = o * s * (1 - Math.abs(this._progressSpeedAcceleration / this._accelerationLimit)), a += (o - a) * this._mouseEasingPower * 1.075 * (.85 * s), this._progress -= a, (this._progress != this._prevProgress || e) && this._timeline.progress(this._progress, i), this._strokesRenderer.update(), this._strokeLettersTexture.update(), this._backParticles.updateMousePos(this._mousePos.x, this._mousePos.y), this._topParticles.updateMousePos(this._mousePos.x, this._mousePos.y), (e || this._progress != this._prevProgress) && this._render(), 0 == e && 0 == this._progress && this._progressSpeedAcceleration < 0 && (this._progressSpeedAcceleration = 0, this._isPlaying = !1, this._showingDirection > 0 ? this._direction > 0 ? this.currentFeatureIndex - 1 >= 0 ? this.showFeature(this.currentFeatureIndex - 1) : this.$dispatcher.trigger(t.FIRST_SCREEN_ANIMATION_CANCEL) : this.showFeature(this.currentFeatureIndex + 1) : this._progress = 1), this._prevProgress = this._progress
                    }
                }
            }, {
                key: "stopPlaying",
                value: function () {
                    this._isPlaying = !1, this.$dispatcher.trigger(t.PLAYING_COMPLETE)
                }
            }, {
                key: "resize",
                value: function (t, e) {
                    this._size.w == t && this._size.h == e || (this._size.w = 2 * Math.round(t / 2), this._size.h = e, this._resizeRenderers(), this._resizeItems())
                }
            }, {
                key: "_prepareFeature",
                value: function (t) {
                    var e = this._params.texts[t];
                    this._backLouveringText.setText(e), this._topLouveringText.setText(e), this._subLouveringText.setText(e), this._strokesRenderer.setText(e), this._strokeLettersTexture.update(), this._flashingText.update(), this._playBtn.visible = 0 == t, this._hitArea.visible = 0 == t, this.currentFeatureIndex <= 0 && 0 == t && (this._shadows.alpha = 0), this._mousePos.x = this._size.w >> 1, this._mousePos.y = this._size.h >> 1, this._backParticles.updateMousePos(this._mousePos.x, this._mousePos.y, !0), this._topParticles.updateMousePos(this._mousePos.x, this._mousePos.y, !0), this._resizeItems()
                }
            }, {
                key: "_playBtnUpdateListener",
                value: function () {
                    this._render()
                }
            }, {
                key: "_resizeItems",
                value: function () {
                    var t = (this._strokesRenderer.getSize(), {
                        w: this._subLouveringText.getSize().w * this._subLouveringText.scale.x,
                        h: this._subLouveringText.getSize().h * this._subLouveringText.scale.y
                    });
                    this._centerRect.height = this._size.h, this._centerRect.x = this._size.w - this._centerRect.width >> 1, this._shadows.height = this._size.h, this._shadows.x = this._size.w - 320 >> 1, this._vLines.height = this._size.h, this._vLines.x = this._size.w - this._vLines.width >> 1, this._backLouveringText.x = this._topLouveringText.x = this._size.w / 2 - this._backLouveringText.getSize().w / 2, this._backLouveringText.y = this._topLouveringText.y = this._size.h / 2 - this._backLouveringText.getSize().h / 2, this._subLouveringText.x = .5 * this._size.w - .5 * t.w - 60, this._subLouveringText.y = .5 * this._size.h - .5 * t.h + 10, this._hitArea.x = this._backLouveringText.x, this._hitArea.y = this._backLouveringText.y, this._hitArea.width = this._backLouveringText.width, this._hitArea.height = this._backLouveringText.height, this._playBtn.x = this._backLouveringText.x + 290, this._playBtn.y = this._backLouveringText.y + 65, (m.browser.isEdge || m.browser.isIE) && (this._playBtn.y += 25), this._strokeLetters.x = this._size.w - this._strokeLetters.width >> 1, this._strokeLetters.y = this._size.h - this._strokeLetters.height >> 1, this._flashingText.setPosition(.5 * this._size.w, .5 * this._size.h), this._flashingText.setScreenSize(this._size.w, this._size.h), this._backParticles.setSize(this._size.w, this._size.h), this._topParticles.setSize(this._size.w, this._size.h), this._centerMask.clear(), this._centerMask.beginFill(16777215), this._centerMask.drawRect(this._size.w - 320 >> 1, 0, 320, this._size.h)
                }
            }, {
                key: "_resizeRenderers",
                value: function () {
                    this._pixi.renderer.resize(this._size.w, this._size.h), this._backLouveringText.resize(), this._topLouveringText.resize(), this._strokeLettersTexture.baseTexture.resolution = v.default.devicePixelRatio, this._strokeLettersTexture.update()
                }
            }, {
                key: "_assetsLoaderListener",
                value: function () {
                    var t = this,
                        e = new d.Sprite(d.Texture.fromFrame("center-bg-no-shadow-small.png")),
                        i = new d.Sprite(d.Texture.fromFrame("vertical-line.png")),
                        r = new d.Sprite(d.Texture.fromFrame("vertical-line.png")),
                        n = new d.Sprite(d.Texture.fromFrame("vertical-line.png")),
                        s = new d.Sprite(d.Texture.fromFrame("vertical-line.png")),
                        a = new d.Sprite(d.Texture.fromFrame("center-bg-shadow.png")),
                        o = new d.Sprite(d.Texture.fromFrame("center-bg-shadow.png")),
                        h = new d.Sprite(d.Texture.fromFrame("colors_2.png")),
                        l = new d.Sprite(d.Texture.fromFrame("colors_2.png")),
                        u = this._pixi.renderer.extract.canvas(h);
                    this.colorsCanvasContext = u.getContext("2d"), this._centerMask = new d.Graphics, this._playBtn = new C.default({
                        textures: {
                            ico: d.Texture.fromFrame("play-btn.png"),
                            bg: d.Texture.fromFrame("play-btn-bg.png")
                        },
                        onUpdateCallback: this._playBtnUpdateListener.bind(this)
                    }), this._backLouveringText = new x.default({
                        fontFamily: this._params.fontFamily,
                        fontSize: this._params.fontSize,
                        texture: d.Texture.fromFrame("stripe-bg.png"),
                        getColor: this._getColor.bind(this)
                    }), this._topLouveringText = new x.default({
                        fontFamily: this._params.fontFamily,
                        fontSize: this._params.fontSize,
                        texture: d.Texture.fromFrame("stripe-bg.png"),
                        getColor: this._getColor.bind(this),
                        louveringsAmount: 16
                    }), this._topLouveringText.mask = this._centerMask, this._subLouveringText = new x.default({
                        fontFamily: this._params.fontFamily,
                        fontSize: this._params.fontSize,
                        texture: d.Texture.fromFrame("stripe-bg.png"),
                        getColor: this._getColor.bind(this),
                        louveringsAmount: 12
                    }), this._subLouveringText.scale.set(1.5), this._subLouveringText.alpha = .35, this._subLouveringText.mask = this._centerMask, this._flashingText = new T.default(d.Texture.fromCanvas(this._backLouveringText.getFillRenderer().getCanvas()), {
                        getColor: this._getColor.bind(this)
                    }), this._flashingText.mask = this._centerMask, this._backParticles = new S.default(d.Texture.fromFrame("particle-small.png"), {
                        amount: 1e3,
                        poolSize: 500,
                        getColor: this._getColor.bind(this)
                    }), this._topParticles = new S.default(d.Texture.fromFrame("particle-big.png"), {
                        amount: 200,
                        poolSize: 200,
                        offsetX: 250,
                        getColor: this._getColor.bind(this),
                        direction: S.default.FROM_CENTER
                    }), this._topParticles.mask = this._centerMask, e.width = 320, i.width = 1, n.width = 1, n.x = 320, r.width = 1, r.x = 960, s.width = 2, s.x = 640, a.pivot.set(0, 0), a.scale.x = -1, o.x = 320, l.alpha = 0, this._centerRect = e, this._hitArea = l, this._shadows.alpha = 0, this._vLines.addChild(i, n, r, s), this._shadows.addChild(a, o), this._pixi.stage.addChildAt(this._vLines, 0), this._pixi.stage.addChild(this._backLouveringText), this._pixi.stage.setChildIndex(this._strokeLetters, 2), this._pixi.stage.addChild(this._backParticles), this._pixi.stage.addChild(this._centerRect), this._pixi.stage.addChild(this._subLouveringText), this._pixi.stage.addChild(this._shadows), this._pixi.stage.addChild(this._flashingText), this._pixi.stage.addChild(this._topLouveringText), this._pixi.stage.addChild(this._centerMask), this._pixi.stage.addChild(this._topParticles), this._pixi.stage.addChild(this._playBtn), this._pixi.stage.addChild(this._hitArea), [this._hitArea].forEach(function (e) {
                        e.interactive = !0, e.buttonMode = !0, e.on("pointerover", t._pointerListener.bind(t)), e.on("pointerout", t._pointerListener.bind(t)), e.on("pointerdown", t._pointerListener.bind(t))
                    })
                }
            }, {
                key: "_render",
                value: function () {
                    this._pixi.render()
                }
            }, {
                key: "_getColor",
                value: function (t) {
                    var e, i;
                    return e = 300 * t | 0, this.colorsBuffer[e] || (i = this.colorsCanvasContext.getImageData(e, 5, 1, 1), this.colorsBuffer[e] = i.data[0] << 16 | i.data[1] << 8 | i.data[2]), this.colorsBuffer[e]
                }
            }, {
                key: "_pointerListener",
                value: function (e) {
                    switch (this._playBtn.processEvent(e.type), e.type) {
                        case "pointerover":
                        case "pointerout":
                            break;
                        case "pointerdown":
                            this.$dispatcher.trigger(t.SHOWREAL_CLICK)
                    }
                }
            }, {
                key: "_mouseListener",
                value: function (t) {
                    var e = this;
                    switch (t.type) {
                        case "mousewheel":
                            var i = t.originalEvent.deltaY * this._direction,
                                r = this._accelerationLimit;
                            if (1 == this._progress) return;
                            i > 0 ? (this._progressSpeedAcceleration += 125e-7 * i, this._progressSpeedAcceleration > r && (this._progressSpeedAcceleration = r)) : (this._progressSpeedAcceleration += 25e-6 * i, this._progressSpeedAcceleration < -r && (this._progressSpeedAcceleration = -r)), this._mouseWheelDelayTween && this._mouseWheelDelayTween.kill(), this._progressSpeedAccelerationTween && this._progressSpeedAccelerationTween.kill(), this._mouseWheelDelayTween = f.TweenMax.delayedCall(.1, function () {
                                e._progressSpeedAccelerationTween = f.TweenMax.to(e, 3.5, {
                                    _progressSpeedAcceleration: 0,
                                    ease: f.Power2.easeInOut
                                })
                            });
                            break;
                        case "mousemove":
                            this._mousePos.x = t.pageX, this._mousePos.y = t.pageY, this._mouseEasingPowerTarget = 1, this._mouseEasing_k = 20, this._mouseEasingDelayTween && this._mouseEasingDelayTween.kill(), this._mouseEasingDelayTween = f.TweenMax.delayedCall(1, function () {
                                e._mouseEasingPowerTarget = 0, e._mouseEasing_k = 200
                            })
                    }
                }
            }, {
                key: "isBusy",
                get: function () {
                    return this._isPlaying
                }
            }]), t
        }();
    e.default = k, k.DEFAULT_PARAMS = {
        fontFamily: "uni_sansheavy_caps",
        fontSize: 150,
        texts: ["what we do"]
    }, k.READY = "ready", k.PLAYING_STARTED = "playing_started", k.LOUVERINGS_PLAYING = "louverings_playing", k.LOUVERINGS_COMPLETE = "louverings_complete", k.PLAYING_COMPLETE = "playing_complete", k.FIRST_SCREEN_ANIMATION_CANCEL = "first_screen_animation_cancel", k.SHOWREAL_CLICK = "showreal_click", k.SHOWING_TIME = 5, k.HIDING_TIME = 1.5, k.PROGRESS_SPEED_DEFAULT = 1 / (60 * k.SHOWING_TIME), k.EMPTY_STATE = "empty_state", k.PLAYING_STATE = "playing_state", k.PLAYING_COMPLETE_STATE = "playing_complete_state"
}