import Component from 'flarum/common/Component';
import app from 'flarum/forum/app';

export default class LevelBar extends Component {
    oninit(vnode) {
        super.oninit(vnode);
    }
    // config() {
    //     this.$().tooltip({ container: 'body' });
    // }

    view() {
        const user = this.attrs.user;
        const pointsText = app.forum.attribute('ianm-level-ranks.pointsText') || app.translator.trans('ianm-level-ranks.lib.defaults.level');

        let expComments = (user.commentCount() - user.discussionCount()) * 21,
            expDiscussions = user.discussionCount() * 33;

        let expTotal = expComments + expDiscussions,
            expLevel = Math.floor(expTotal / 135),
            expPercent = (100 / 135) * ((expTotal) - (expLevel * 135));

        return (
            <div class="PostUser-level" title={`${expTotal} ${app.translator.trans('ianm-level-ranks.forum.desc.expText')}`}>
                <span class="PostUser-text">
                    <span class="PostUser-levelText">{pointsText}</span>
                    &nbsp;
                    <span class="PostUser-levelPoints">{expLevel}</span>
                </span>
                <div class="PostUser-bar PostUser-bar--empty"></div>
                <div class="PostUser-bar" style={"width: " + expPercent + '%;'}></div>
            </div>
        );
    }
}
