
import React, { useRef, useState } from 'react';
import { Navbar, Page, Block, Card, CardHeader, CardContent, Link, Button, Sheet, Toolbar, PageContent } from 'framework7-react';
import SheetInvoices from '../components/Invoices';

const TestPage = () => {
    const sheet = useRef(null);
    const [sheetOpenedInvoices, setSheetOpenedInvoices] = useState(false);

    return (
        <Page>
            <Navbar title="Cards Expandable" />

            <Button fill sheetOpen=".demo-sheet">
                Open Sheet
            </Button>

            <Button onClick={()=>{setSheetOpenedInvoices(true)}}>
                Open Sheet
            </Button>
            {/* <Sheet
                className="demo-sheet"
                opened={sheetOpened}
                onSheetClosed={() => {
                    setSheetOpened(false);
                }}
            >
                <Toolbar>
                    <div className="left"></div>
                    <div className="right">
                        <Link sheetClose>Close</Link>
                    </div>
                </Toolbar>

                <PageContent>
                    <Block>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ducimus dolorum ipsa
                            aliquid accusamus perferendis laboriosam delectus numquam minima animi, libero illo in
                            tempora harum sequi corporis alias ex adipisci.
                        </p>
                        <p>
                            Sunt magni enim saepe quasi aspernatur delectus consectetur fugiat necessitatibus qui
                            sed, similique quis facere tempora, laudantium quae expedita ea, aperiam dolores. Aut
                            deserunt soluta alias magnam. Consequatur, nisi, enim.
                        </p>
                        <p>
                            Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis
                            voluptatibus similique odit ab. Quaerat quasi consectetur quidem libero? Repudiandae
                            adipisci vel voluptatum, autem libero minus dignissimos repellat.
                        </p>
                        <p>
                            Iusto, est corrupti! Totam minus voluptas natus esse possimus nobis, delectus veniam
                            expedita sapiente ut cum reprehenderit aliquid odio amet praesentium vero temporibus
                            obcaecati beatae aspernatur incidunt, perferendis voluptates doloribus?
                        </p>
                        <p>
                            Illum id laborum tempore, doloribus culpa labore ex iusto odit. Quibusdam consequuntur
                            totam nam obcaecati, enim cumque nobis, accusamus, quos voluptates, voluptatibus
                            sapiente repellendus nesciunt praesentium velit ipsa illo iusto.
                        </p>
                    </Block>
                </PageContent>
            </Sheet> */}
            <SheetInvoices 
                opened={sheetOpenedInvoices}
                onClose={() => setSheetOpenedInvoices(false)}
            />

        </Page>
    );
}
export default TestPage;