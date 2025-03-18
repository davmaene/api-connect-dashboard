import { Oval, FallingLines, Puff, Vortex } from  'react-loader-spinner';
import { CircularProgress } from "react-cssfx-loading";

export const LoaderComponent = ({ size, primaryColor, secondaryColor }) => {
    return(
        <div 
            className=""
            style={{
                // width: "auto",
                // height: "auto",
                alignContent: "center", 
                alignItems: "center",
                justifyContent: "center",
                // background: "red",
                position: 'relative'
            }}
        >
            <>
                <CircularProgress 
                    width={size}
                    color={primaryColor}
                    style={{ alignSelf: "center", justifyContent: "center", justifySelf: "center", padding: 0, margin: "0 auto", marginTop: -4 }}
                />
                {/* <Vortex
                    height={size}
                    width={size}
                    radius={size}
                    colors={[primaryColor]}
                    wrapperStyle={{ alignSelf: "center" }}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor={secondaryColor}
                    strokeWidth={7}
                    strokeWidthSecondary={7}
                /> */}
            </>
        </div>
    )
}