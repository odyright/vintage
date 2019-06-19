// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
import * as PIXI from 'pixi.js'
import { debounce, Resp } from '../../modules/dev/helpers';

export class Feature {

    constructor(){
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

}