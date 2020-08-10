class Images {
  public src: string = 'https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
  public alt: string = '谷歌'
  public width: number = 500
}

type propsNames = keyof Images

type propsType = Images[propsNames]