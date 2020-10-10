const weather = '';
const weiboIcon =
  '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1602301938424" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4017" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs><style type="text/css"></style></defs><path d="M851.4 590.193c-22.196-66.233-90.385-90.422-105.912-91.863-15.523-1.442-29.593-9.94-19.295-27.505 10.302-17.566 29.304-68.684-7.248-104.681-36.564-36.14-116.512-22.462-173.094 0.866-56.434 23.327-53.39 7.055-51.65-8.925 1.89-16.848 32.355-111.02-60.791-122.395C311.395 220.86 154.85 370.754 99.572 457.15 16 587.607 29.208 675.873 29.208 675.873h0.58c10.009 121.819 190.787 218.869 412.328 218.869 190.5 0 350.961-71.853 398.402-169.478 0 0 0.143-0.433 0.575-1.156 4.938-10.506 8.71-21.168 11.035-32.254 6.668-26.205 11.755-64.215-0.728-101.66z m-436.7 251.27c-157.71 0-285.674-84.095-285.674-187.768 0-103.671 127.82-187.76 285.674-187.76 157.705 0 285.673 84.089 285.673 187.76 0 103.815-127.968 187.768-285.673 187.768z" fill="#E71F19" p-id="4018"></path><path d="M803.096 425.327c2.896 1.298 5.945 1.869 8.994 1.869 8.993 0 17.7-5.328 21.323-14.112 5.95-13.964 8.993-28.793 8.993-44.205 0-62.488-51.208-113.321-114.181-113.321-15.379 0-30.32 3.022-44.396 8.926-11.755 4.896-17.263 18.432-12.335 30.24 4.933 11.662 18.572 17.134 30.465 12.238 8.419-3.46 17.268-5.33 26.41-5.33 37.431 0 67.752 30.241 67.752 67.247 0 9.068-1.735 17.857-5.369 26.202a22.832 22.832 0 0 0 12.335 30.236l0.01 0.01z" fill="#F5AA15" p-id="4019"></path><path d="M726.922 114.157c-25.969 0-51.65 3.744-76.315 10.942-18.423 5.472-28.868 24.622-23.5 42.91 5.509 18.29 24.804 28.657 43.237 23.329a201.888 201.888 0 0 1 56.578-8.064c109.253 0 198.189 88.271 198.189 196.696 0 19.436-2.905 38.729-8.419 57.16-5.508 18.289 4.79 37.588 23.212 43.053 3.342 1.014 6.817 1.442 10.159 1.442 14.943 0 28.725-9.648 33.37-24.48 7.547-24.906 11.462-50.826 11.462-77.175-0.143-146.588-120.278-265.813-267.973-265.813z" fill="#F5AA15" p-id="4020"></path><path d="M388.294 534.47c-84.151 0-152.34 59.178-152.34 132.334 0 73.141 68.189 132.328 152.34 132.328 84.148 0 152.337-59.182 152.337-132.328 0-73.15-68.19-132.334-152.337-132.334zM338.53 752.763c-29.454 0-53.39-23.755-53.39-52.987 0-29.228 23.941-52.989 53.39-52.989 29.453 0 53.39 23.76 53.39 52.989 0 29.227-23.937 52.987-53.39 52.987z m99.82-95.465c-6.382 11.086-19.296 15.696-28.726 10.219-9.43-5.323-11.75-18.717-5.37-29.803 6.386-11.09 19.297-15.7 28.725-10.224 9.43 5.472 11.755 18.864 5.37 29.808z" fill="#040000" p-id="4021"></path></svg>';
const zhihuIcon = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1602301919921" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3148" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs><style type="text/css"></style></defs><path d="M544.059897 959.266898h-64.949141c-228.633593 0-415.697442-187.063849-415.697442-415.697442v-64.949141c0-228.633593 187.063849-415.697442 415.697442-415.697442h64.949141c228.633593 0 415.697442 187.063849 415.697442 415.697442v64.949141c-0.001024 228.633593-187.064873 415.697442-415.697442 415.697442z" fill="#006CE2" p-id="3149"></path><path d="M513.358696 494.912378h-84.12549c1.331051-13.311533 4.791783-49.517142 4.791783-70.01635 0-20.499208-0.26621-50.049562-0.26621-50.049563h84.65791v-13.311533c0-17.837106-7.720095-25.823412-14.110163-25.823412H357.08615s4.259363-14.642584 8.252516-29.816564c3.993153-15.175004 13.045323-36.471819 13.045323-36.471819-51.913034 3.460732-55.995265 41.974179-67.354248 76.405394-11.358984 34.431216-20.232998 51.380613-36.73803 88.917273 22.8951 0 45.523989-11.180828 55.107556-26.622042 9.583567-15.441215 13.932008-33.543507 13.932008-33.543507h51.114403v48.629434c0 17.39274-3.194522 72.056954-3.194522 72.056953h-91.225111c-15.973635 0-24.492361 40.28784-24.492361 40.28784h110.215112c-6.921465 62.473387-21.830259 87.498168-42.772809 125.833459-20.94255 38.336314-76.405395 81.907754-76.405395 81.907754 33.809717 9.583567 71.347401-2.928312 87.320012-18.103317 15.973635-15.175004 29.550354-40.998416 39.401155-60.017086 9.849777-19.01867 18.103316-53.659782 18.103317-53.659782l89.449693 110.481322s3.993153-19.966788 5.324204-32.478666c1.331051-12.512903-0.621498-21.741181-3.816021-29.19609-3.194522-7.453885-12.778089-17.748028-25.557201-32.656823-12.778089-14.908794-39.578287-43.57144-39.578287-43.57144s-13.045323 9.583567-23.16131 17.304686c7.453885-18.103316 13.399587-65.667909 13.399587-65.667909h100.808677v-16.683187c0.002048-14.551458-6.031708-24.135025-14.905722-24.135025zM750.117843 329.500632H557.019214a3.54981 3.54981 0 0 0-3.549811 3.54981v358.510375a3.54981 3.54981 0 0 0 3.549811 3.549811h33.145216l12.112563 41.530836 66.820804-41.530836h81.020046a3.54981 3.54981 0 0 0 3.54981-3.549811V333.050442a3.54981 3.54981 0 0 0-3.54981-3.54981zM713.024525 654.112211h-43.128097l-50.714064 32.212457-8.918042-32.212457h-15.441214V368.723631h118.202441V654.112211z" fill="#FFFFFF" p-id="3150"></path></svg>`;
const doubanIcon = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1602302039126" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5679" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17"><defs><style type="text/css"></style></defs><path d="M1023.978667 862.826667a161.152 161.152 0 0 1-161.173334 161.173333h-701.632a161.152 161.152 0 0 1-161.173333-161.173333v-701.632a161.194667 161.194667 0 0 1 161.173333-161.173334h701.632a161.194667 161.194667 0 0 1 161.173334 161.173334v701.632z" fill="#05B711" p-id="5680"></path><path d="M218.56 208.064h586.816v66.090667h-586.816zM754.389333 601.557333v-258.410666h-484.8v258.410666h484.8z m-414.506666-192.384h344.917333v126.357334h-344.917333v-126.357334zM649.493333 750.506667c21.098667-32.298667 41.002667-69.738667 59.434667-112.256l-70.506667-25.706667c-18.346667 50.368-39.701333 96.426667-64 137.941333h-122.709333c-20.373333-53.802667-43.328-99.818667-69.077333-137.941333l-64.853334 25.706667c26.752 40.128 48.32 77.482667 64.853334 112.256h-180.693334v65.386666h620.053334v-65.386666h-172.501334z" fill="#FFFFFF" p-id="5681"></path></svg>`;
module.exports = { weiboIcon, zhihuIcon, doubanIcon };