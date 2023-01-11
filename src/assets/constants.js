import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from 'react-icons/hi'

export const genres = [
  { title: '全部', value: '0' },
  { title: '华语', value: '7' },
  { title: '欧美', value: '96' },
  { title: '日本', value: '8' },
  { title: '韩国', value: '16' },
]

export const links = [
  { name: '新歌速递', to: '/', icon: HiOutlineHome },
  { name: '推荐音乐', to: '/recommend', icon: HiOutlinePhotograph },
  { name: '热门歌手', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: '热门歌曲', to: '/top-charts', icon: HiOutlineHashtag },
]
