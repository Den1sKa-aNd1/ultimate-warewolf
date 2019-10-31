export const SHOW_POPUP = 'SHOW_POPUP'

export const PUT_OBJECTS = 'PUT_OBJECTS'

export const putObjects = (objectsToRender: any) => {
    return { type: PUT_OBJECTS, objectsToRender }
}

export const showPopup = () => {
    return { type: SHOW_POPUP }
}