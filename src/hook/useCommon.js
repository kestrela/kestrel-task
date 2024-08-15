export const useCommon = ()=>{
    function setLayoutDrag(dragId) {
        const resize = document.getElementById(dragId)
        let previousElement = resize.previousSibling
        let nextElement = resize.nextSibling
        let previousTag = previousElement.tagName
        let nextTag = nextElement.tagName
        resize.onmousedown = (e) => {
          const startX = e.clientX
          const startY = e.clientY
          let type = ''
          if (previousTag === 'ASIDE' && nextTag === 'MAIN') {
            type = 'ASIDE-MAIN'
          } else if (previousTag === 'MAIN' && nextTag === 'ASIDE') {
            type = 'MAIN-ASIDE'
          } else if (
            (previousTag === 'HEADER' && nextTag === 'MAIN') ||
            (previousTag === 'FOOTER' && nextTag === 'MAIN')
          ) {
            type = 'HEADER-MAIN'
          } else if (
            (previousTag === 'MAIN' && nextTag === 'HEADER') ||
            (previousTag === 'MAIN' && nextTag === 'FOOTER')
          ) {
            type = 'MAIN-HEADER'
          }
          let initWidth = 0,
            initHeight = 0
          if (type === 'ASIDE-MAIN') {
            initWidth = previousElement.clientWidth // 初始位置
          } else if (type === 'MAIN-ASIDE') {
            initWidth = nextElement.clientWidth // 初始位置
          } else if (type === 'HEADER-MAIN') {
            initHeight = previousElement.clientHeight
          } else if (type === 'MAIN-HEADER') {
            initHeight = nextElement.clientHeight
          }
          document.onmousemove = (k) => {
            const endX = k.clientX
            const endY = k.clientY
            let moveLen = endX - startX // 横向移动宽度
            let moveHeight = endY - startY // 纵向移动高度
            switch (type) {
              case 'ASIDE-MAIN':
                let asideMainWidth = initWidth + moveLen
                if (moveLen < 0) {
                  // 向左移
                  if (asideMainWidth > 400) {
                    // 左侧剩90
                    previousElement.style.width = asideMainWidth + 'px'
                  }
                } else {
                  // 向右移动
                  if (nextElement.clientWidth > 400) {
                    // 右侧剩90
                    previousElement.style.width = asideMainWidth + 'px'
                  }
                }
                break
              case 'MAIN-ASIDE':
                let mainAsideWidth = initWidth - moveLen
                if (moveLen < 0) {
                  // 向左移
                  if (previousElement.clientWidth > 400) {
                    // 左侧剩90
                    nextElement.style.width = mainAsideWidth + 'px'
                  }
                } else {
                  // 向右移动
                  if (mainAsideWidth > 400) {
                    nextElement.style.width = mainAsideWidth + 'px'
                  }
                }
                break
              case 'HEADER-MAIN': {
                let headerMainHeight = initHeight + moveHeight
                if (moveHeight < 0) {
                  // 向上移
                  if (headerMainHeight > 60) {
                    // 上侧剩90
                    previousElement.style.height = headerMainHeight + 'px'
                  }
                } else {
                  // 向下移动
                  if (nextElement.clientHeight > 60) {
                    // 下侧剩90
                    previousElement.style.height = headerMainHeight + 'px'
                  }
                }
                break
              }
              case 'MAIN-HEADER': {
                let mainHeaderHeight = initHeight - moveHeight
                if (moveHeight < 0) {
                  // 向上移
                  if (previousElement.clientHeight > 60) {
                    // 左侧剩90
                    nextElement.style.height = mainHeaderHeight + 'px'
                  }
                } else {
                  // 向下移动
                  if (mainHeaderHeight > 60) {
                    nextElement.style.height = mainHeaderHeight + 'px'
                  }
                }
                break
              }
      
              default:
            }
          }
          document.onmouseup = (evt) => {
            document.onmousemove = null
            document.onmouseup = null
            resize.releaseCapture && resize.releaseCapture()
          }
          resize.setCapture && resize.setCapture()
          return false
        }
      }

      return {
        setLayoutDrag
      }
}