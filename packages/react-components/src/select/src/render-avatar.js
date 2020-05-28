import { SIZE } from "../../shared";
import { Image as SemanticImage } from "semantic-ui-react";
import { isElement } from "react-is";
import { isNil } from "lodash";

const AVATAR_SIZE = {
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
};

export function renderAvatar(avatar, size) {
    const props = {
        avatar: true,
        size: AVATAR_SIZE[size]
    };

    if (!isNil(avatar)) {
        if (isElement(avatar)) {
            return (
                <SemanticImage {...props}>
                    {avatar}
                </SemanticImage>
            );
        }

        return SemanticImage.create({
            ...avatar,
            ...props
        });
    }
}
