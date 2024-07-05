import Svg, { Path } from "react-native-svg";
import { CustomSvgProps } from "../icons.type";

export const GrapesSvg = (props: CustomSvgProps) => (
  <Svg fill="currentColor" viewBox="0 -13 512 512" {...props}>
    <Path d="M407.004 106.426C428.289 78.219 441.379 40.96 441.379 0h-17.652c0 75.926-48.97 137.879-110.063 140.95a61.336 61.336 0 0 0-22.973-7.927c-4.03-30.191-29.886-53.574-61.171-53.574-19.254 0-36.97 9.028-48.516 23.742-11.32-14.421-28.867-23.742-48.59-23.742-34.074 0-61.793 27.715-61.793 61.793 0 13.602 4.469 26.473 12.379 36.996-27.29 6.407-47.691 30.895-47.691 60.106 0 19.347 8.953 36.633 22.918 47.969-23.633 8.687-40.575 31.355-40.575 57.96 0 10.524 2.66 20.606 7.672 29.68C10 385.207 0 403.297 0 423.723c0 34.074 27.719 61.793 61.793 61.793 22.113 0 41.492-11.715 52.418-29.22 10.418 7.434 22.969 11.563 35.867 11.563 24.742 0 46.07-14.652 55.93-35.699 9.66 5.977 20.773 9.219 32.336 9.219 27.48 0 50.812-18.043 58.812-42.902 8.992 4.914 19.074 7.59 29.465 7.59 34.074 0 61.793-27.72 61.793-61.794 0-13.418-4.352-25.82-11.644-35.96 17.851-11.133 29.3-30.817 29.3-52.313 0-34.074-27.425-61.996-61.793-61.723v-.07c0-14.223-4.87-27.297-12.976-37.746 21.433-4.398 41.082-14.965 57.703-30.164 5.8 57.883 54.777 103.219 114.168 103.219H512v-8.825c0-59.988-46.273-109.289-104.996-114.265zm-81.145 95.84c-.007.027-.023.05-.023.078-.16.867-.469 1.676-.68 2.527-.383 1.508-.761 3.02-1.281 4.457-.426 1.168-.973 2.27-1.492 3.383-.496 1.059-.988 2.11-1.563 3.125a45.1 45.1 0 0 1-2.12 3.344 42.582 42.582 0 0 1-1.895 2.527c-.848 1.05-1.703 2.094-2.649 3.063-.761.785-1.582 1.492-2.394 2.214-.953.86-1.88 1.743-2.903 2.508-1.836 1.367-3.754 2.621-5.793 3.7-.554.3-1.171.492-1.738.765-1.723.813-3.48 1.563-5.316 2.156-.68.219-1.387.367-2.074.555-2.18.582-4.38 1.105-6.68 1.352-.223-.125-.45-.215-.672-.336a61.402 61.402 0 0 0-13.602-5.739c-.644-.187-1.296-.336-1.953-.504-1.8-.449-3.636-.82-5.496-1.113-.68-.105-1.36-.23-2.05-.316-2.4-.293-4.84-.489-7.31-.496-.042 0-.085-.008-.132-.008a44.362 44.362 0 0 1-10.203-10.762l-.567-.883a43.314 43.314 0 0 1-6.507-17.918l-.149-1.035a43.445 43.445 0 0 1-.273-4.703c0-24.34 19.8-44.137 44.136-44.137 24.34 0 44.137 19.797 44.137 44.137a43.49 43.49 0 0 1-.758 8.059zm-31.343 110.293c-.797 1.457-1.704 2.84-2.657 4.191-.3.422-.593.855-.91 1.281-.847 1.121-1.785 2.18-2.746 3.211-.496.531-.973 1.078-1.492 1.582-.895.871-1.848 1.668-2.809 2.473-.652.539-1.297 1.094-1.984 1.594-.945.699-1.961 1.308-2.969 1.933-.773.477-1.535.98-2.336 1.406-.242.122-.504.22-.742.336-.133-.097-.281-.168-.414-.265a61.509 61.509 0 0 0-16.508-8.899c-.39-.14-.762-.289-1.148-.422a61.633 61.633 0 0 0-8.633-2.18 46.982 46.982 0 0 0-1.68-.257c-2.98-.441-6.027-.75-9.144-.75-3.23 0-6.45.254-9.63.758.044-.29.028-.582.071-.871.434-2.887.73-5.793.73-8.715 0-2.41-.175-4.774-.437-7.113-.09-.793-.242-1.582-.363-2.375a59.268 59.268 0 0 0-1.555-7.223 56.91 56.91 0 0 0-1.43-4.387c-.273-.742-.52-1.5-.82-2.234a61.364 61.364 0 0 0-2.976-6.293l-.024-.055c.457-.336.844-.765 1.297-1.117 1.922-1.492 3.77-3.047 5.48-4.734.422-.422.813-.871 1.227-1.305 1.773-1.856 3.441-3.79 4.961-5.836.266-.363.512-.723.77-1.086a60.513 60.513 0 0 0 4.332-7.055l.382-.722c1.368-2.7 2.551-5.48 3.512-8.375.008-.04.027-.063.043-.098 4.043-1.184 8.086-1.785 12.086-1.785 2.707 0 5.332.328 7.906.805.77.14 1.528.328 2.29.503a42.82 42.82 0 0 1 5.542 1.723c.668.254 1.36.477 2.02.766 2.394 1.058 4.707 2.277 6.851 3.726l.063.043c1.941 1.317 3.7 2.867 5.41 4.465 1.652 1.555 3.11 3.258 4.492 5.016.453.574.965 1.078 1.38 1.676 1.464 2.074 2.69 4.293 3.784 6.57.188.394.45.75.63 1.144 1.136 2.579 1.984 5.262 2.612 8.016.043.195.133.371.176.566.598 2.825.89 5.73.918 8.653l-.187 3.097c-.38 6.383-2.153 12.457-5.016 17.903a8.099 8.099 0 0 1-.355.715zm-122.961 35.644a59.757 59.757 0 0 0-5.703-1.808c-.52-.141-1.032-.274-1.563-.399a63.348 63.348 0 0 0-5.48-1.023c-.555-.078-1.094-.188-1.649-.258-2.332-.262-4.691-.438-7.09-.438-2.515 0-5.129.184-7.902.57-.309-.218-.617-.437-.926-.667 0-2.004-.105-4-.308-5.977-.133-1.332-.364-2.64-.582-3.957-.11-.617-.16-1.242-.286-1.851-.316-1.625-.73-3.215-1.171-4.793-.083-.282-.133-.575-.223-.856-.492-1.676-1.086-3.312-1.711-4.926-.07-.187-.133-.379-.203-.566a59.576 59.576 0 0 0-2.172-4.73c-.098-.196-.188-.391-.285-.586a56.088 56.088 0 0 0-2.504-4.34c-.16-.258-.3-.524-.469-.77-.867-1.34-1.8-2.621-2.762-3.89-.238-.313-.46-.63-.699-.938a61.702 61.702 0 0 0-3-3.477c-.222-.242-.414-.503-.644-.746a43.822 43.822 0 0 1 2.601-9.285c2.457-1.351 4.778-2.914 7.02-4.582.203-.148.406-.3.61-.45a62.048 62.048 0 0 0 12.237-12.394c1.641-2.207 3.176-4.503 4.52-6.921.21-.086.414-.176.625-.266a44.165 44.165 0 0 1 7.035-2.11c.399-.078.805-.132 1.211-.203 2.516-.449 5.059-.738 7.645-.738 2.804 0 5.535.324 8.199.828.344.063.699.106 1.035.176 2.523.54 4.969 1.324 7.316 2.277.399.16.786.329 1.176.496a44.829 44.829 0 0 1 6.602 3.583c.316.21.625.46.941.68a43.613 43.613 0 0 1 5.246 4.335c.29.281.598.52.883.813 1.543 1.57 2.902 3.308 4.2 5.093.718.977 1.35 2 1.98 3.028a42.932 42.932 0 0 1 2.203 4.07c.453.941.883 1.898 1.265 2.879.653 1.684 1.172 3.422 1.614 5.2.215.827.468 1.64.629 2.476.52 2.668.847 5.394.847 8.203 0 2.656-.312 5.316-.832 7.953-.238 1.2-.68 2.395-1.023 3.586-.477 1.648-.875 3.3-1.555 4.934-10.062 5.535-18.289 13.921-23.937 24.144a46.487 46.487 0 0 1-5.414 1.969c-2.118-1.13-4.325-2.11-6.575-2.992-.316-.125-.644-.23-.972-.356zm-12.66-109.86c0-2.745-.239-5.429-.59-8.077a61.448 61.448 0 0 0-.262-1.73c-.406-2.532-.938-5.016-1.645-7.442-.035-.121-.062-.246-.097-.371-.793-2.676-1.793-5.262-2.93-7.778-.168-.363-.351-.715-.52-1.086a61.884 61.884 0 0 0-3.55-6.453c-.133-.21-.227-.457-.367-.668a46.376 46.376 0 0 1 4.379-5.351c.484-.176.94-.407 1.43-.598a62.56 62.56 0 0 0 3.042-1.273 62.373 62.373 0 0 0 2.422-1.164 53.927 53.927 0 0 0 2.957-1.598c.774-.441 1.535-.91 2.285-1.395a60.751 60.751 0 0 0 2.711-1.82 87.285 87.285 0 0 0 2.293-1.71 74.184 74.184 0 0 0 2.332-1.919c.387-.336.813-.637 1.192-.98 5.773-1.57 11.562-1.782 17.144-1.059 1.836.238 3.66.566 5.438 1.035.68.176 1.347.38 2.011.582a43.52 43.52 0 0 1 5.758 2.25c.344.16.695.309 1.031.477a44.462 44.462 0 0 1 12.555 9.55l.555.61c1.07 1.227 2.144 2.453 3.074 3.813.133.82.344 1.617.512 2.421.343 1.696.75 3.364 1.234 5.004.399 1.36.805 2.719 1.297 4.051.39 1.043.84 2.05 1.281 3.063a63.499 63.499 0 0 0 1.395 3.011 68.057 68.057 0 0 0 1.66 3.125c.133.23.238.477.379.707.133 1.305.222 2.621.222 3.946 0 2.964-.363 5.87-.93 8.703l-.437 1.8c-2.254 9.172-7.37 17.25-14.426 23.208-.23.195-.468.382-.695.574-.586.469-1.281.804-1.89 1.246a64.349 64.349 0 0 0-4.192-3.805 61.276 61.276 0 0 0-4.582-3.426c-.039-.027-.07-.054-.11-.082a60.953 60.953 0 0 0-16.109-7.757c-.015-.008-.043-.016-.062-.028-1.711-.527-3.45-.96-5.215-1.34-.258-.054-.496-.132-.75-.187-1.617-.328-3.258-.547-4.898-.75-.418-.055-.82-.14-1.239-.188a61.64 61.64 0 0 0-6.258-.316c-2.886 0-5.738.273-8.554.664-.336.043-.688.027-1.024.078.043-.289.028-.582.07-.875.391-2.84.673-5.734.673-8.691zm31.703-117.89c7.632-14.293 22.554-23.351 38.918-23.351 21.578 0 39.582 15.566 43.398 36.054-.316.051-.617.164-.937.219-2.735.469-5.438 1.07-8.032 1.89-.168.051-.336.133-.504.184-2.46.805-4.836 1.785-7.156 2.88-.574.265-1.14.538-1.703.82-2.394 1.218-4.715 2.554-6.922 4.054-.25.164-.469.36-.719.527a60.999 60.999 0 0 0-5.691 4.575 57.8 57.8 0 0 0-1.36 1.234 63.611 63.611 0 0 0-5.413 5.82c-.247.301-.457.625-.696.934a62.023 62.023 0 0 0-4.035 5.855c-.308.5-.629.997-.918 1.516a62.2 62.2 0 0 0-3.531 7.188c-.176.441-.317.89-.496 1.332a62.19 62.19 0 0 0-2.145 6.78c-.097.368-.254.704-.343 1.075-4.618-3.46-9.7-6.16-15.06-8.2-.503-.194-1.015-.362-1.534-.538a60.575 60.575 0 0 0-7.692-2.149c-.504-.105-.988-.238-1.492-.324-.547-.098-1.074-.273-1.633-.363a44.17 44.17 0 0 1-4.324-6.461c.07-.203.098-.426.168-.629a61.593 61.593 0 0 0 2.383-9.012c.094-.511.148-1.023.238-1.535.512-3.125.84-6.312.84-9.586 0-3.277-.328-6.465-.82-9.597-.082-.52-.14-1.032-.242-1.543a60.098 60.098 0 0 0-2.391-9.024c-.07-.21-.086-.422-.156-.625zm-58.184-23.351c18.14 0 33.75 11.027 40.52 26.714 1.058 2.47 1.824 5.012 2.425 7.59.07.301.211.574.274.883.61 2.93.918 5.922.918 8.953 0 3.028-.309 6.02-.918 8.95-.063.308-.203.574-.274.882-.59 2.578-1.359 5.121-2.425 7.594-3.25 7.512-8.547 13.91-15.157 18.582-.46.324-.93.652-1.398.953a43.886 43.886 0 0 1-6.406 3.484c-.399.168-.805.301-1.203.47-5.075 2.03-10.575 3.222-16.356 3.222-1.324 0-2.621-.082-3.91-.215-.211-.121-.441-.226-.664-.351a56.046 56.046 0 0 0-3.352-1.782c-.601-.3-1.203-.594-1.8-.875a60.837 60.837 0 0 0-3.54-1.472 62.021 62.021 0 0 0-5.676-1.863 41.558 41.558 0 0 0-1.449-.372 60.782 60.782 0 0 0-4.421-.937c-.133-.024-.258-.063-.391-.078-11.89-8.282-18.934-21.68-18.934-36.192-.004-24.34 19.801-44.14 44.137-44.14zm-79.45 141.242c0-24.34 19.802-44.137 44.138-44.137 2.605 0 5.12.336 7.601.766.715.125 1.43.238 2.137.398a44.002 44.002 0 0 1 6.531 2.027 48.01 48.01 0 0 1 1.785.762c2.242 1.016 4.422 2.145 6.446 3.504l.246.16c4.191 2.852 7.777 6.48 10.777 10.559a44.517 44.517 0 0 1 1.871 2.762 43.501 43.501 0 0 1 2.402 4.421c.415.875.84 1.75 1.2 2.649.695 1.773 1.238 3.62 1.703 5.492.195.777.449 1.535.601 2.324.512 2.7.84 5.473.84 8.313 0 2.726-.328 5.379-.804 7.972-.086.461-.133.918-.239 1.368-.476 2.199-1.191 4.308-1.988 6.375-.336.875-.68 1.738-1.074 2.593-.54 1.176-1.203 2.27-1.836 3.391-.692 1.2-1.317 2.437-2.113 3.566-.723 1.036-1.586 1.942-2.399 2.903a43.98 43.98 0 0 1-5.527 5.527c-.961.805-1.86 1.668-2.895 2.383-1.137.805-2.383 1.441-3.601 2.129-6.418 3.672-13.754 5.93-21.66 5.93-24.34 0-44.141-19.801-44.141-44.137zM40.837 365.602c-3.629-6.504-5.523-13.77-5.523-21.329 0-24.336 19.796-44.136 44.136-44.136 11.653 0 22.203 4.625 30.094 12.039 1.648 1.547 3.105 3.25 4.484 5.008.45.574.97 1.086 1.395 1.687 1.457 2.055 2.676 4.262 3.762 6.531.191.407.464.778.644 1.192 1.129 2.558 1.977 5.242 2.602 7.972.043.204.14.395.187.598.637 2.977.969 6.031.969 9.113 0 2.04-.176 4.121-.52 6.301-4.464 2.192-8.562 5.024-12.386 8.211-.743.61-1.524 1.164-2.23 1.816-1.2 1.094-2.278 2.313-3.391 3.508-.961 1.024-1.95 2.02-2.844 3.106-.899 1.113-1.703 2.297-2.524 3.468-.652.926-1.402 1.782-2.004 2.747-.195-.141-.414-.239-.617-.372a62.763 62.763 0 0 0-6.746-4.093c-.687-.364-1.394-.68-2.09-1.016a61.168 61.168 0 0 0-6.34-2.605c-.503-.176-.98-.391-1.492-.547-2.57-.813-5.226-1.414-7.93-1.89-.695-.122-1.402-.22-2.097-.317-2.828-.39-5.668-.664-8.582-.664-3.3 0-6.523.34-9.684.84-.52.082-1.043.14-1.554.242-3.114.57-6.133 1.402-9.075 2.425-.21.067-.433.086-.644.165zm20.957 102.257c-24.336 0-44.137-19.796-44.137-44.136 0-17.637 10.469-32.785 25.469-39.84a44.745 44.745 0 0 1 3.457-1.43c1.211-.45 2.445-.812 3.7-1.156 1.413-.367 2.827-.75 4.257-.977.844-.14 1.738-.168 2.602-.265 5.933-.59 11.91-.035 17.566 1.687.54.164 1.078.317 1.606.5a44.299 44.299 0 0 1 4.82 2.004c.91.453 1.793.938 2.656 1.45 1.219.695 2.438 1.394 3.586 2.206 1.332.953 2.559 2.02 3.77 3.114.68.609 1.43 1.14 2.07 1.8.875.883 1.582 1.918 2.379 2.88 1.117 1.35 2.258 2.683 3.203 4.14.652 1.016 1.156 2.117 1.73 3.187.743 1.368 1.528 2.72 2.118 4.157.574 1.414.945 2.922 1.378 4.414.344 1.199.801 2.375 1.051 3.601.54 2.754.856 5.606.856 8.528 0 2.8-.328 5.52-.832 8.175-.282 1.446-.758 2.868-1.192 4.297-.449 1.528-.8 3.09-1.41 4.547l-.07.203c-6.715 15.801-22.403 26.914-40.633 26.914zm88.277-17.652c-10.64 0-20.625-3.727-28.601-10.586.043-.168.062-.344.105-.52.54-2.101.969-4.238 1.29-6.41.077-.503.167-1.007.23-1.507.289-2.446.492-4.926.492-7.461 0-3.118-.309-6.16-.758-9.153-.09-.566-.16-1.12-.258-1.687a60.47 60.47 0 0 0-2.172-8.617c-.132-.395-.289-.786-.433-1.172a61.748 61.748 0 0 0-8.887-16.489c-.062-.082-.11-.18-.168-.257.504-.989.918-2.04 1.492-2.985.282-.465.54-.941.84-1.394 1.543-2.34 3.274-4.547 5.235-6.551.14-.148.3-.273.441-.414 2.074-2.059 4.324-3.945 6.789-5.57.008-.008.016-.016.023-.028a44.234 44.234 0 0 1 8.282-4.297l.656-.257a43.29 43.29 0 0 1 7.484-2.098 45.744 45.744 0 0 1 3.196-.477c1.57-.18 3.132-.347 4.722-.347 2.657 0 5.227.34 7.75.789.793.14 1.59.308 2.375.504 1.89.449 3.727 1.03 5.508 1.71.637.247 1.3.415 1.926.696a44.381 44.381 0 0 1 13.195 8.89c1.563 1.52 2.88 3.204 4.176 4.899.488.637 1.07 1.176 1.52 1.836 1.007 1.465 1.75 3.074 2.57 4.637 3.16 6.07 5.12 12.87 5.12 20.18 0 2.675-.335 5.261-.788 7.804-.098.54-.16 1.066-.274 1.605-4.335 19.825-21.98 34.727-43.078 34.727zm88.274-26.484a43.791 43.791 0 0 1-27.063-9.32c.028-.176.016-.356.035-.532.329-2.558.547-5.156.547-7.805 0-2.027-.113-4.043-.308-6.039-.055-.527-.153-1.039-.215-1.57a60.906 60.906 0 0 0-.668-4.387c-.106-.527-.238-1.047-.363-1.578a57.604 57.604 0 0 0-1.094-4.238c-.153-.484-.309-.961-.469-1.438a60.566 60.566 0 0 0-1.52-4.148c-.183-.461-.386-.918-.59-1.379a61.003 61.003 0 0 0-2.663-5.34 66.709 66.709 0 0 0-2.067-3.398c-.37-.567-.734-1.137-1.12-1.696a68.146 68.146 0 0 0-2.06-2.753c-.527-.668-1.046-1.348-1.605-2.004-.191-.227-.363-.465-.555-.688.371-1.101.899-2.117 1.348-3.18l1-2.027c4.281-8.707 11.422-15.855 20.117-20.129l2.313-1.137c.644-.265 1.27-.566 1.933-.796 1.395-.512 2.817-.883 4.239-1.235.73-.187 1.453-.379 2.203-.531 1.289-.254 2.59-.422 3.886-.555.856-.086 1.711-.16 2.579-.203a44.925 44.925 0 0 1 3.699-.015c1.695.062 3.355.253 4.996.5 1.738.265 3.441.636 5.137 1.105 1.27.352 2.543.715 3.77 1.172 1.163.433 2.304.926 3.425 1.457a43.043 43.043 0 0 1 3.777 2.059c.84.5 1.715.953 2.528 1.507 1.78 1.243 3.425 2.649 5.004 4.133 1.667 1.57 3.117 3.293 4.503 5.047.477.61 1.024 1.148 1.473 1.785 1.149 1.633 2.047 3.39 2.957 5.145.457.902 1.043 1.722 1.445 2.656.723 1.66 1.168 3.434 1.672 5.184.317 1.093.774 2.125 1.016 3.257.57 2.922.898 5.922.898 8.977 0 24.336-19.8 44.137-44.14 44.137zm88.277-35.313c-9.578 0-18.84-3.133-26.484-8.894 0-.047-.008-.082-.008-.118-.012-2.921-.285-5.78-.692-8.597-.078-.512-.148-1.024-.238-1.535a61.533 61.533 0 0 0-5.605-17.188c-.043-.086-.086-.176-.133-.262a62.632 62.632 0 0 0-4.848-8.015.766.766 0 0 0-.023-.055c4.219-2.629 8.023-5.793 11.45-9.312.589-.61 1.155-1.239 1.722-1.864a60.913 60.913 0 0 0 3.73-4.601c.524-.703 1.078-1.375 1.563-2.098a61.298 61.298 0 0 0 3.683-6.234c.653-1.254 1.2-2.559 1.766-3.856a63.317 63.317 0 0 0 1.238-3.058c.59-1.586 1.145-3.176 1.613-4.817.07-.258.114-.515.188-.77.465-1.745.934-3.495 1.254-5.288 3.3-.844 7.422-1.711 9.824-1.711 2.922 0 5.774.316 8.535.867 1.219.238 2.375.687 3.555 1.031 1.5.434 3.031.805 4.46 1.387 1.403.574 2.727 1.351 4.071 2.074 1.102.59 2.242 1.102 3.281 1.781 1.422.93 2.727 2.04 4.051 3.133 9.801 8.098 16.184 20.192 16.184 33.863 0 24.34-19.801 44.137-44.137 44.137zM388.414 256c0 16.629-9.543 31.86-24.18 39.309-.16-.125-.336-.204-.492-.317a61.509 61.509 0 0 0-16.508-8.898c-.39-.14-.757-.293-1.148-.426a62.737 62.737 0 0 0-8.633-2.18 46.758 46.758 0 0 0-1.676-.254c-2.992-.441-6.039-.75-9.156-.75-.21 0-1.004.07-2.02.176-2.464.078-4.917.262-7.355.645-.027-.188-.086-.371-.113-.559a62.297 62.297 0 0 0-1.36-6.84c-.105-.398-.195-.793-.308-1.195a61.24 61.24 0 0 0-6.93-15.774c-1.457-2.347-3.012-4.632-4.762-6.761.25-.086.47-.219.707-.309a62.681 62.681 0 0 0 5.52-2.41c.273-.14.54-.281.812-.422a64.794 64.794 0 0 0 5.641-3.293c.035-.027.07-.043.106-.07 11.933-7.89 20.957-19.746 25.132-33.715 25.27-1.586 46.723 18.848 46.723 44.043zm18.098-131.973c46.156 4.387 83.004 41.235 87.39 87.395-46.16-4.39-83.004-41.238-87.39-87.395zm0 0" />
  </Svg>
);

export default GrapesSvg;
