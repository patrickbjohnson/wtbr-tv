import React, { useState } from 'react';

import styles from './sticker-picker.module.css'

import StickerOne from '../../static/sticker-1.svg'
import StickerTwo from '../../static/sticker-2.svg'
import StickerThree from '../../static/sticker-3.svg'
import StickerFour from '../../static/sticker-4.svg'
import StickerFive from '../../static/sticker-5.svg'
import StickerSix from '../../static/sticker-6.svg'
import StickerSeven from '../../static/sticker-7.svg'
import StickerEight from '../../static/sticker-8.svg'
import StickerNine from '../../static/sticker-9.svg'
import StickerTen from '../../static/sticker-10.svg'

import StickerButtonOne from '../../static/sticker-button-1.png'
import StickerButtonTwo from '../../static/sticker-button-2.png'
import StickerButtonThree from '../../static/sticker-button-3.png'
import StickerButtonFour from '../../static/sticker-button-4.png'
import StickerButtonFive from '../../static/sticker-button-5.png'

const images = [
  StickerOne,
  StickerTwo,
  StickerThree,
  StickerFour,
  StickerFive,
  StickerSix,
  StickerSeven,
  StickerEight,
  StickerNine,
  StickerTen,
]

const buttons = [
  StickerButtonOne,
  StickerButtonTwo,
  StickerButtonThree,
  StickerButtonFour,
  StickerButtonFive,
]

const getRandomPosition = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomButton = () => {
  return buttons[Math.floor(Math.random() * buttons.length)]
}

const button = getRandomButton()

const StickerPicker = () => {
    const [stickers, setStickers] = useState([])
    const [availableStickers, setAvailableStickers] = useState(images)

    const getRandomSticker = () => {
      return availableStickers[Math.floor(Math.random() * availableStickers.length)]
    }


    const stickerPosition = () => {
      let scrollPosition = 0
      let height = 0
      let width = 0

      if(window) {
        scrollPosition = window.scrollY
        height = window.innerHeight
        width = window.innerWidth
      }

      const xMin = 0
      const xMax = width
      const yMin = scrollPosition
      const yMax = height + scrollPosition

      return {
        left: getRandomPosition(xMin, xMax),
        top: getRandomPosition(yMin, yMax),
      }
    }

    const addSticker = () => {
      let scrollPosition = 0
      let height = 0
      let width = 0

      if(window) {
        scrollPosition = window.scrollY
        height = window.innerHeight
        width = window.innerWidth
      }

      const xMin = .1 * width
      const xMax = .9 * width
      const yMin = .1 * height + scrollPosition
      const yMax = .9 * height + scrollPosition

      const sticker = getRandomSticker()

      setStickers([...stickers,
        {
          src: sticker,
          style: {
            left: `${getRandomPosition(xMin, xMax)}px`,
            top: `${getRandomPosition(yMin, yMax)}px`,
          }
      }])

      setAvailableStickers(availableStickers.filter(s => s !== sticker))
    }

    const buttonStyle = {
      right: '64px',
      bottom: '64px'
    }

    return (
        <>
            { availableStickers.length > 0 && (
              <img onClick={addSticker} className={styles.button} src={button} style={buttonStyle} />
            )}
            <div className={styles.wrapper}>
                { stickers.map(({ src, style }) => console.log('src', src) || (
                    <img src={src} className={styles.sticker} style={style} />
                ))}
            </div>
        </>
    )
}

export default StickerPicker;
