package com.rosy.main.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.rosy.common.enums.ErrorCode;
import com.rosy.common.exception.BusinessException;
import com.rosy.common.utils.QueryWrapperUtil;
import com.rosy.main.domain.dto.message.MessageQueryRequest;
import com.rosy.main.domain.entity.Message;
import com.rosy.main.domain.entity.Message;
import com.rosy.main.domain.vo.MessageVO;
import com.rosy.main.mapper.MessageMapper;
import com.rosy.main.service.IMessageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

/**
 * <p>
 * 留言 服务实现类
 * </p>
 *
 * @author Rosy
 * @since 2025-01-17
 */
@Service
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements IMessageService {

    // 🪐 NAMES（赛博法号）
    private static final List<String> NAMES = List.of(
            "线程安全帽", "咖啡因编译器", "甲方需求翻译官", "git --amend仙人",
            "元宇宙钉子户", "ChatGPT替身", "分布式摸鱼者", "全栈颈椎病",
            "开源节流大师", "代码禅修者", "API街溜子", "云原生流浪汉",
            "防沉迷系统漏洞", "跨域恋爱专家", "递归脱发者", "内存泄漏艺术家",
            "K8s云游僧", "区块链韭菜工程师", "竞态条件赌徒", "AI绘画受害者",
            "TypeScript神棍", "NPE玄学研究者", "敏捷开发躺平者", "DevOps跳大神",
            "996超度指南", "回滚派诗人", "代码气味鉴赏家", "敏捷太极拳传人",
            "Docker放生者", "代码功德林", "敏捷气氛组", "元宇宙房产中介",
            "技术债催收员", "代码风水师", "祖传屎山守护者", "伪需求品鉴师",
            "《颈椎病康复指南》读者", "人工智障驯兽师", "分布式背锅侠",
            "云计算神父", "IDE玄窗派", "代码巫毒教祭司", "产品经理诱捕器",
            "赛博功德+1", "CtrlCV真君", "码德经传人", "开源布道者",
            "需求炼金术士", "debug通灵师", "摆烂不摆谱"
    );

    // 🎭 USERNAMES（赛博法号@版）
    private static final List<String> USERNAMES = List.of(
            "@StackOverflow幸存者", "@PM需求粉碎机", "@git_push_force天尊",
            "@404_love_not_found", "@NPE玄学研究院", "@咖啡是本体",
            "@sudo_rm_rf人生", "@npm install --绝望", "@甲方克星",
            "@代码因果律武器", "@元宇宙钉子户", "@ChatGPT代相亲",
            "@5G脑波干扰受害者", "@量子速读失败者", "@祖传代码开光",
            "@线程安全套失效", "@KPI炼丹炉", "@需求文档驱魔人",
            "@996福报研究所", "@回滚派大弟子", "@开源节流仙人",
            "@代码风水利器", "@敏捷气氛组组长", "@产品经理诱捕器",
            "@删库跑路预备役", "@赛博功德+1s", "@摆渡人式编程",
            "@颈椎病推拿VIP", "@凌晨四点改需求", "@月薪三千架构师",
            "@git_blame甩锅侠", "@内存泄漏艺术展", "@需求炼金失败案例",
            "@咖啡因成瘾晚期", "@Deadline驱魔仪式", "@元宇宙房产泡沫",
            "@区块链韭菜田", "@AI绘画工伤鉴定", "@祖传屎山观光团",
            "@技术债高利贷", "@《代码大全》垫显示器", "@重构轮回者",
            "@产品需求考古队", "@加班功德无量", "@摸鱼派正统在摸鱼"
    );

    private static final Random RANDOM = new Random();

    private String getRandomElement(List<String> list) {
        return list.get(RANDOM.nextInt(list.size()));
    }

    private String getRandomAvatar() {
        int avatarNumber = RANDOM.nextInt(20) + 1; // 生成 1-100 之间的随机数字
        return "picture/message/" + avatarNumber + ".svg";
    }

    @Override
    public MessageVO getMessageVO(Message message) {
        if (message == null) {
            return null;
        }
        return BeanUtil.copyProperties(message, MessageVO.class);
    }

    @Override
    public Wrapper<Message> getQueryWrapper(MessageQueryRequest messageQueryRequest) {
        if (messageQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        LambdaQueryWrapper<Message> queryWrapper = new LambdaQueryWrapper<>();

        // 动态添加查询条件
        QueryWrapperUtil.addCondition(queryWrapper, messageQueryRequest.getId(), Message::getId);
        QueryWrapperUtil.addCondition(queryWrapper, messageQueryRequest.getContent(), Message::getContent);
        QueryWrapperUtil.addCondition(queryWrapper, messageQueryRequest.getCreateTime(), Message::getCreateTime);

        // 添加排序条件
        QueryWrapperUtil.addSortCondition(queryWrapper,
                messageQueryRequest.getSortField(),
                messageQueryRequest.getSortOrder(),
                Message::getId);

        return queryWrapper;
    }

    @Override
    public List<MessageVO> getMessageVOs(List<Message> messages) {
        return messages.stream().map(message -> {
            MessageVO messageVO = new MessageVO();
            messageVO.setId(message.getId());
            messageVO.setContent(message.getContent());
            messageVO.setCreateTime(message.getCreateTime());
            messageVO.setName(getRandomElement(NAMES));
            messageVO.setUsername(getRandomElement(USERNAMES));
            messageVO.setAvatar(getRandomAvatar());
            return messageVO;
        }).collect(Collectors.toList());
    }
}
