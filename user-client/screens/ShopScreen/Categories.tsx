import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native'
import SingleMenuItem from '../../components/SingleMenuItem';
import serverpb from "../../proto/server_pb";

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

type CategoryProps = {
    info: {
        title: string;
        data: Array<serverpb.MenuItem>;
    };
    shopId: string;
    cart: any[];
    updateCart: (itemId: string, newCount: number) => void;
}

const Categories = (props: CategoryProps) => {

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if(props.info.title && props.info.title.toLowerCase() === "bestsellers") {
            setOpen(true);
        }
    }, []);

    const onPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpen(!open);
    }

    const _renderList = () => {
        return(
            <View style={{width: '100%'}}>
                {
                    props.info.data.map((data: serverpb.MenuItem, idx: number) => {
                        return (
                            <SingleMenuItem 
                                key={idx}
                                bestSeller={data.getBestseller()}
                                category={data.getCategory()}
                                id={data.getId()}
                                name={data.getName()}
                                price={data.getPrice()}
                                weight={data.getWeight()}
                                shopId={props.shopId}
                                cart={props.cart}
                                updateCart={props.updateCart}
                            />
                        )
                    })
                }
            </View>
        ) 
    }

    return (
        <View style={styles.parentContainer}>
            <TouchableOpacity 
                style={[styles.container, !open && { height: 50 }]} 
                onPress={onPress} 
            >
                <View style={styles.categoryTitleContainer}>    
                    <Text style={styles.categoryTitle}>
                        {props.info.title}
                    </Text>
                    {
                        open ? 
                        <AntDesign name="caretup" size={18} color="black" />
                        :
                        <AntDesign name="caretdown" size={18} color="black" />
                    }
                </View>
            </TouchableOpacity>

            {open && _renderList()}
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    parentContainer: {
        marginBottom: 20,
        alignItems: 'center',
        width: '100%',
    },
    container: {
        width: '97%',
    },
    categoryTitle: {
        fontWeight: '700',
        fontSize: 18,
    },
    categoryTitleContainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 6,
        alignItems: 'center',
    }
})
