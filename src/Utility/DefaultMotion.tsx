import { MotionStyle, motion } from "framer-motion";

export default function DefaultMotion({
    key,
    children,
    style,
}: {
    key: React.Key | null | undefined;
    children: React.ReactNode;
    style?: MotionStyle;
}) {
    const useStyle: MotionStyle = style ?? {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    };
    return (
        <motion.div
            key={key}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0.5 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            style={useStyle}
        >
            {children}
        </motion.div>
    );
}
